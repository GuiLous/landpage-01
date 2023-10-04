// Routes
export const APP_ROUTES = {
  private: {
    register: '/cadastrar',
    verify: '/verificar',
    changeEmail: '/alterar-email',
    play: '/jogar',
    inactive: '/conta-inativa',
  },
  public: {
    home: '/',
    auth: '/auth',
    notFound: '/not-found',
    maintenance: '/manutencao',
  },
}

// Pins input
export const TOTAL_SIGNUP_PINS = 6

// Maintenance
export const MAINTENANCE_TIME_TO_CHECK_AGAIN = 1000 * 60 * 1 // 1 minute

// Sidebar
export const SIDEBAR_TOP_MENU_ITEMS = [
  'amigos',
  'notificações',
  'ranking',
  'loja',
]
export const SIDEBAR_BOTTOM_MENU_ITEMS = ['suporte', 'sair']
export const SOON_ITEMS = ['ranking', 'loja']
export const MENU_LINKS = ['loja', 'ranking']

// Links
export const INSTAGRAM_LINK = 'https://www.instagram.com/reloadclubgg/'
export const TWITTER_LINK = 'https://twitter.com/reloadclubgg'
export const DISCORD_LINK = 'https://discord.gg/mMMKshktfT'
export const YOUTUBE_LINK =
  'https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A'
export const FACEBOOK_LINK =
  'https://www.facebook.com/profile.php?id=100089787770305'
export const USETERMS_LINK =
  'https://reloadclub.freshdesk.com/support/solutions/articles/150000108190-termos-de-uso'
export const PRIVACY_POLICY_LINK =
  'https://reloadclub.freshdesk.com/support/solutions/articles/150000108164-pol%C3%ADtica-de-privacidade'
export const SUPPORT_LINK = 'https://reloadclub.freshdesk.com/support/home'

// Support
export const MAX_FILES = 4
export const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB
export const FILE_TYPES = [
  'image/jpg',
  'image/gif',
  'image/png',
  'application/pdf',
]
