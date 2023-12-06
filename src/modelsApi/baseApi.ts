import { httpService } from '@/services'

import { store } from '@/store'
import { addToast } from '@/store/slices/appSlice'

type BaseAPI = {
  endpoint: string
  token: string | null
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  payload?: any
  headers_content_type?: string
  options?: RequestInit
}

type request = {
  endpoint: string
  token: string | null
  payload?: any
  headers_content_type?: string
  options?: RequestInit
}

export const baseApi = {
  async call({
    endpoint,
    token,
    method,
    payload,
    headers_content_type,
    options,
  }: BaseAPI) {
    let response

    try {
      response = await httpService[method](
        endpoint,
        token,
        payload,
        headers_content_type,
        options
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

  async list({ endpoint, token, options }: request) {
    return await this.call({ endpoint, token, method: 'get', options })
  },

  async detail({ endpoint, token, options }: request) {
    return await this.call({ endpoint, token, method: 'get', options })
  },

  async replace({
    endpoint,
    token,
    options,
    payload,
    headers_content_type,
  }: request) {
    return await this.call({
      endpoint,
      token,
      method: 'put',
      payload,
      headers_content_type,
      options,
    })
  },

  async update({
    endpoint,
    token,
    options,
    payload,
    headers_content_type,
  }: request) {
    return await this.call({
      endpoint,
      token,
      method: 'patch',
      payload,
      headers_content_type,
      options,
    })
  },

  async create({
    endpoint,
    token,
    options,
    payload,
    headers_content_type,
  }: request) {
    return await this.call({
      endpoint,
      token,
      method: 'post',
      payload,
      headers_content_type,
      options,
    })
  },

  async delete({ endpoint, token, options, payload }: request) {
    return await this.call({
      endpoint,
      token,
      method: 'delete',
      payload,
      options,
    })
  },
}
