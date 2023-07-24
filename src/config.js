export const REACT_APP_ENV = process.env.REACT_APP_ENV || 'local'
export const REACT_APP_DEBUG = process.env.REACT_APP_DEBUG === 'false' || true
export const REACT_APP_API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8000'
export const REACT_APP_WS_URL =
  process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws/'
export const REACT_APP_SHOW_FAKE_SIGNIN =
  process.env.REACT_APP_SHOW_FAKE_SIGNIN === 'true' || REACT_APP_ENV === 'local'
