// Routes
export const PRIVATE_ROUTES = [
  '/cadastrar',
  '/verificar',
  '/alterar-email',
  '/jogar',
  '/conta-inativa',
  '/partidas',
  '/perfil',
  '/conta',
  '/inventario',
  '/loja',
  '/checkout',
  '/ranking',
]
export const PUBLIC_ROUTES = ['/', '/not-found', '/manutencao']
export const ROUTES_TO_INITIALIZE_SLICES = [
  '/jogar',
  '/partidas',
  '/conta',
  '/perfil',
  '/manutencao',
  '/loja',
  '/inventario',
  '/ranking',
]
export const ROUTES_SIGNUP = [
  '/api',
  '/cadastrar',
  '/verificar',
  '/alterar-email',
]

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
export const SOON_ITEMS = [
  process.env.NEXT_PUBLIC_REACT_APP_STORE_ENABLED === 'false' && 'loja',
]
export const MENU_LINKS = ['loja', 'ranking']

// Links
export const INSTAGRAM_LINK = 'https://www.instagram.com/reloadclubgg/'
export const TWITTER_LINK = 'https://twitter.com/reloadclubgg'
export const DISCORD_LINK = 'https://discord.gg/nKz76bnbKu'
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
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const FILE_TYPES = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'application/pdf',
  'video/mp4',
  'video/avi',
  'video/x-matroska',
  'video/quicktime',
]
export const IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
export const VIDEO_TYPES = [
  'video/mp4',
  'video/avi',
  'video/x-matroska',
  'video/quicktime',
]

// Drawer Friends
export const AVAILABLE_STATUS = ['online', 'away', 'teaming']
export const CAN_RENDER_OPENED = [
  'No seu grupo',
  'Online',
  'Solicitações de amizade',
  'Lista de amigos',
  'Resultados da busca',
]
export const COLOR_STATUS = {
  online: 'text-green-600',
  offline: 'text-gray-300',
  away: 'text-salmon-500',
  in_game: 'text-yellow-400',
  teaming: 'text-yellow-400',
  queued: 'text-yellow-400',
}
export const STATUS_MAP = {
  online: 'Online',
  offline: 'Offline',
  away: 'Ausente',
  in_game: 'Em jogo',
  teaming: 'Em grupo',
  queued: 'Na fila',
}
export const DEBOUNCE_SEARCH_TIME = 500

// Lobby
export const GAME_TYPES = ['TDM 5X5', 'RANQUEADA 5X5', 'PERSONALIZADA']
export const GAME_TYPES_AVAILABLE = ['RANQUEADA 5X5', 'PERSONALIZADA']
export const MATCH_FOUND_GAP_TIMEOUT = 3000
export const TIME_OUT_MULTIPLIER = 1000
export const NOT_FIRST_ACCESS_KEY = 'NOT_FIRST_ACCESS'

// Connect
export const COUNTDOWN_TIME = 5 * 60 // 5 minutes in seconds
export const TIMER_NAME = 'matchConnectTimer'
export const CONNECT_TEXTS_ARRAY = [
  `Ligando as luzes`,
  `Limpando os bombsites`,
  `Calibrando as armas da loja`,
  `Testando a c4`,
  `Checando a validade dos coletes`,
  `Distribuindo os créditos`,
  `Sorteando os lados iniciais`,
  `Distribuindo os trajes`,
]

// Profile
export const USER_LOGGED_BUTTONS = ['config', 'profile', 'inventory']
export const LINK_PATHS = {
  perfil: 'profile',
  conta: 'config',
  inventario: 'inventory',
}

// Pagination
export const SIBLINGS_COUNT = 1

// ProgressBar
export const MIN_PROGRESS = 0
export const MAX_PROGRESS = 100

// Inventory
export const TABS = ['arsenal', 'personagem', 'sprays']
export const TABS_NO_SWITCH = ['avatar', 'sprays']

// Websocket
export const SEND_KEEP_ALIVE_TIME = 7000 // 7 seconds

// Store
export const STORE_FEATURED_INTERVAL = 5000 // 5 seconds
export const STORE_FEATURED_TRANSITION_TIME = 400 // 400 milliseconds
