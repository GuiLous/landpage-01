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

export const TOTAL_SIGNUP_PINS = 6

export const MAINTENANCE_TIME_TO_CHECK_AGAIN = 1000 * 60 * 1 // 1 minute
