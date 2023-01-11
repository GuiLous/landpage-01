const STORAGE_KEY = 'kst__'

export const StorageService = {
  save(key, data) {
    return localStorage.setItem(STORAGE_KEY + key, JSON.stringify(data))
  },

  load(key) {
    let data = localStorage.getItem(STORAGE_KEY + key)
    try {
      return JSON.parse(data)
    } catch (e) {
      return null
    }
  },

  remove(key) {
    localStorage.removeItem(STORAGE_KEY + key)
  },

  set(key, value) {
    return localStorage.setItem(STORAGE_KEY + key, value)
  },

  get(key) {
    return localStorage.getItem(STORAGE_KEY + key)
  },
}

export default StorageService
