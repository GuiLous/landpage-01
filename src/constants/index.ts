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
export const SOONITEMS = ['ranking', 'loja']
export const MENULINKS = ['loja', 'ranking']
