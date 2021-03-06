import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ArticleModel from '../../models/article';
import InternalServerException from '../../exceptions/InternalServerException';
import { Tag } from '@/models/tag';

/**
 * Get all tags in article
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const index = (_: Request, res: Response, next: NextFunction): void => {
  ArticleModel.aggregate()
    .unwind('tags')
    .group({ _id: '$tags', value: { $sum: 1 } })
    .project({ _id: 0, name: '$_id', value: 1 })
    .sort('-value -name')
    .exec()
    .then((tags: Tag[]): void => {
      // Set response
      res.status(200).json({ tags });
    })
    .catch((): void => {
      // Pass error to Express
      next(new InternalServerException('Failed to query documents.'));
    });
};

/**
 * Find articles by tag
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const show = (req: Request, res: Response, next: NextFunction): void => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  // Get query parameter
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  // Find data from database
  const { tag } = req.params as any;
  ArticleModel.find({ tags: tag })
    .skip(skip)
    .limit(limit)
    .exec()
    .then((articles): void => {
      // Set response
      res.status(200).json({ articles });
    })
    .catch((): void => {
      // Pass error to Express
      next(new InternalServerException('Failed to query documents.'));
    });
};

export default { index, show };
