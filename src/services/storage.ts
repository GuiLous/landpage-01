const STORAGE_KEY = 'rld__'

export const storageService = {
  save(key: string, data: any) {
    return localStorage.setItem(STORAGE_KEY + key, JSON.stringify(data))
  },

  load(key: string) {
    const data = localStorage.getItem(STORAGE_KEY + key)

    try {
      if (data) return JSON.parse(data)
    } catch (e) {
      return null
    }
  },

  remove(key: string) {
    localStorage.removeItem(STORAGE_KEY + key)
  },

  set(key: string, value: any) {
    return localStorage.setItem(STORAGE_KEY + key, value)
  },

  get(key: string) {
    return localStorage.getItem(STORAGE_KEY + key)
  },
}

export default storageService
