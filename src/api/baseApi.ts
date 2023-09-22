import { httpService } from '@/services'

import { store } from '@/store'
import { addToast } from '@/store/slices/appSlice'

type BaseAPI = {
  endpoint: string
  token: string
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  payload?: any
  headers_content_type?: string
}

export const baseApi = {
  async call({
    endpoint,
    token,
    method,
    payload,
    headers_content_type,
  }: BaseAPI) {
    let response

    try {
      response = await httpService[method](
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

  async list(endpoint: string, token: string) {
    return await this.call({ endpoint, token, method: 'get' })
  },

  async detail(endpoint: string, token: string) {
    return await this.call({ endpoint, token, method: 'get' })
  },

  async replace(
    endpoint: string,
    token: string,
    payload?: any,
    headers_content_type?: string
  ) {
    return await this.call({
      endpoint,
      token,
      method: 'put',
      payload,
      headers_content_type,
    })
  },

  async update(
    endpoint: string,
    token: string,
    payload?: any,
    headers_content_type?: string
  ) {
    return await this.call({
      endpoint,
      token,
      method: 'patch',
      payload,
      headers_content_type,
    })
  },

  async create(
    endpoint: string,
    token: string,
    payload?: any,
    headers_content_type?: string
  ) {
    return await this.call({
      endpoint,
      token,
      method: 'post',
      payload,
      headers_content_type,
    })
  },

  async delete(endpoint: string, token: string, payload?: any) {
    return await this.call({ endpoint, token, method: 'delete', payload })
  },
}
