import { HttpService } from '@services'
import { addToast } from '@slices/AppSlice'
import store from '@store'

export const BaseAPI = {
  async call(endpoint, token, method, payload, headers_content_type) {
    let response

    try {
      response = await HttpService[method](
        endpoint,
        token,
        payload,
        headers_content_type
      )
    } catch (error) {
      store.dispatch(
        addToast({
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

  async replace(endpoint, token, payload, headers_content_type) {
    return await this.call(
      endpoint,
      token,
      'put',
      payload,
      headers_content_type
    )
  },

  async update(endpoint, token, payload, headers_content_type) {
    return await this.call(
      endpoint,
      token,
      'patch',
      payload,
      headers_content_type
    )
  },

  async create(endpoint, token, payload, headers_content_type) {
    return await this.call(
      endpoint,
      token,
      'post',
      payload,
      headers_content_type
    )
  },

  async delete(endpoint, token, payload) {
    return await this.call(endpoint, token, 'delete', payload)
  },
}

export default BaseAPI
