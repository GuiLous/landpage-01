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
  async request(
    method,
    endpoint,
    token,
    payload,
    headers_content_type = 'application/json',
    custom_unknown_error
  ) {
    console.log(payload)
    if (endpoint[0] !== '/') endpoint = '/' + endpoint
    if (endpoint.slice(-1) === '/') endpoint = endpoint.slice(0, -1)
    let url = REACT_APP_API_URL + '/api' + endpoint
    if (!url.includes('?')) {
      url += '/'
    }

    let headers = {
      Accept: headers_content_type,
      'Content-Type': headers_content_type,
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

    if (payload) {
      request = {
        ...request,
        body:
          headers_content_type === 'application/json'
            ? JSON.stringify(payload)
            : payload,
      }
    }

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
            errorMsg: json.detail[0].msg,
            fieldsErrors: json.detail.reduce((acc, currentValue) => {
              const field = currentValue.loc[currentValue.loc.length - 1]
              const errorMsg = currentValue.msg

              acc[field] = errorMsg
              return acc
            }, {}),
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

  post(endpoint, token, payload, headers_content_type) {
    return HttpService.request(
      'POST',
      endpoint,
      token,
      payload,
      headers_content_type
    )
  },

  patch(endpoint, token, payload, headers_content_type) {
    return HttpService.request(
      'PATCH',
      endpoint,
      token,
      payload,
      headers_content_type
    )
  },

  put(endpoint, token, payload, headers_content_type) {
    return HttpService.request(
      'PUT',
      endpoint,
      token,
      payload,
      headers_content_type
    )
  },

  delete(endpoint, token, payload) {
    return HttpService.request('DELETE', endpoint, token, payload)
  },
}

export default HttpService
