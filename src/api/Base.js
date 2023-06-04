import { HttpService } from '@services'
import { addToast } from '@slices/AppSlice'
import store from '@store'

export const BaseAPI = {
  async call(endpoint, token, method, payload) {
    let response

    try {
      response = await HttpService[method](endpoint, token, payload)
    } catch (error) {
      store.dispatch(
        addToast({
          title: 'Algo saiu errado...',
          content: response.errorMsg,
          variant: 'error',
        })
      )
      return null
    }

    return response
  },

  async list(endpoint, token) {
    return await this.call(endpoint, token, 'get')
  },

  async detail(endpoint, token) {
    return await this.call(endpoint, token, 'get')
  },

  async replace(endpoint, token, payload) {
    return await this.call(endpoint, token, 'put', payload)
  },

  async update(endpoint, token, payload) {
    return await this.call(endpoint, token, 'patch', payload)
  },

  async create(endpoint, token, payload) {
    return await this.call(endpoint, token, 'post', payload)
  },

  async delete(endpoint, token) {
    return await this.call(endpoint, token, 'delete')
  },
}

export default BaseAPI
