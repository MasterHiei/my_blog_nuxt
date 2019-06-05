export default {
  link: {
    locale: '日本語',
    index: 'ホーム',
    tags: 'タグ',
    archives: 'アーカイブ',
    about: 'サイト関連',
  },
  season: {
    spring: '春',
    summer: '夏',
    autumn: '秋',
    winter: '冬',
  },
  loading: {
    noResult: 'データがありません。',
    error:
      '何か問題が起こったようです。しばらくしてからもう一度お試しください。',
  },
  article: {
    recommend: 'おすすめ記事',
    list: '新着記事',
    views: '閲覧数 {number}',
    comments: 'コメント {number}',
    stars: 'いいね {number}',
  },
  tag: {
    title: 'タグ一覧',
    chart: {
      title: 'タグ数（棒グラフ）',
      total: '合計',
      less: '少ない',
      more: '多い',
    },
  },
  archives: {
    chart: {
      title: 'アクティビティカレンダー',
      monthLabel:
        '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月',
      dayLabel: ',月,,水,,金,',
      tooltip: {
        noData:
          '<span style="color: #D7D7D7; font-weight: 300;">{date}の</span>記事はありません',
        normal:
          '<span style="color: #D7D7D7; font-weight: 300;">{date}に</span>{number}件の記事があります',
      },
      less: '少ない',
      more: '多い',
    },
  },
  profile: {
    name: 'S.Ryu',
    position: 'iOS & フルスタック（仮）エンジニア',
    experience: '経歴',
    skill: '技術スタック',
  },
  auth: {
    register: '登録',
    registerLink: 'こちら',
    registerPromotion: 'アカウントの作成は{link}へ',
    login: 'ログイン',
    loginWithGithub: 'Githubアカウントでログイン',
    loginWithGoogle: 'Googleアカウントでログイン',
    loginPromotion: 'ねぇ、コメントを投稿してみませんか？',
    logout: 'ログアウト',
    email: 'メールアドレス',
    username: 'ユーザ名',
    usernameTips: '可：半角スペース、記号（-._）',
    password: 'パスワード',
    passwordTips: '必須：半角英数字、可：下線',
  },
  post: '投稿',
  dialog: {
    title: '確認',
    agree: 'はい',
    cancel: 'いええ',
  },
  errors: {
    auth: {
      invalid: 'メールアドレスかパスワードが間違っています',
      existed: 'このアカウントが既に存在します',
    },
    failed:
      '何か問題が起こったようです。もう一度お試し、もしくは管理者に連絡してください。',
  },
};
