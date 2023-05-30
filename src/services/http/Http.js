import { REACT_APP_API_URL } from '@config'

export class HttpException extends Error {
  constructor(message, payload, status_code) {
    super(message)
    this.name = 'HttpException'
    this.payload = payload
    this.status_code = status_code
  }
}

export const HttpService = {
  async request(method, endpoint, token, payload, custom_unknown_error) {
    if (endpoint[0] !== '/') endpoint = '/' + endpoint
    if (endpoint.slice(-1) === '/') endpoint = endpoint.slice(0, -1)
    let url = REACT_APP_API_URL + '/api' + endpoint
    if (!url.includes('?')) {
      url += '/'
    }

    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    if (token)
      headers = {
        ...HttpService.headers,
        Authorization: 'Bearer ' + token,
      }

    let request = {
      method: method,
      headers: headers,
    }

    if (payload) request = { ...request, body: JSON.stringify(payload) }
    const defaultError = custom_unknown_error || 'Ocorreu um erro desconhecido.'
    let response

    try {
      response = await fetch(url, request)
    } catch {
      return { errorMsg: defaultError }
    }

    if (response.ok) return await response.json()
    else {
      try {
        const json = await response.json()
        if (Array.isArray(json.detail)) {
          return {
            ...json,
            field: json.detail[0].loc[2],
            errorMsg: json.detail[0].msg,
            formError: {
              field: json.detail[0].loc[2],
              error: json.detail[0].msg,
            },
          }
        } else return { ...json, errorMsg: json.detail }
      } catch {
        return { ...response, errorMsg: response.statusText }
      }
    }
  },

  get(endpoint, token) {
    return HttpService.request('GET', endpoint, token)
  },

  post(endpoint, token, payload) {
    return HttpService.request('POST', endpoint, token, payload)
  },

  patch(endpoint, token, payload) {
    return HttpService.request('PATCH', endpoint, token, payload)
  },

  put(endpoint, token, payload) {
    return HttpService.request('PUT', endpoint, token, payload)
  },

  delete(endpoint, token) {
    return HttpService.request('DELETE', endpoint, token)
  },
}

export default HttpService
