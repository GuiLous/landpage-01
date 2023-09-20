export class HttpException extends Error {
  payload: any
  status_code: number

  constructor(message: string, payload: any, status_code: number) {
    super(message)
    this.name = 'HttpException'
    this.payload = payload
    this.status_code = status_code
  }
}

export const httpService = {
  async request(
    method: string,
    endpoint: string,
    token: string | null,
    payload: any,
    headers_content_type = 'application/json',
    custom_unknown_error?: string
  ) {
    if (endpoint[0] !== '/') endpoint = '/' + endpoint

    if (endpoint.slice(-1) === '/') endpoint = endpoint.slice(0, -1)

    let url = process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/api' + endpoint

    if (!url.includes('?')) {
      url += '/'
    }

    let headers: Record<string, string> = {
      Accept: headers_content_type,
      'Content-Type': headers_content_type,
    }

    if (token)
      headers = {
        ...headers,
        Authorization: 'Bearer ' + token,
      }

    let request: RequestInit = {
      method,
      headers,
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
    let response: Response

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
            fieldsErrors: json.detail.reduce((acc: any, currentValue: any) => {
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

  get(endpoint: string, token: string | null) {
    return httpService.request('GET', endpoint, token, null)
  },

  post(
    endpoint: string,
    token: string | null,
    payload: any,
    headers_content_type?: string
  ) {
    return httpService.request(
      'POST',
      endpoint,
      token,
      payload,
      headers_content_type
    )
  },

  patch(
    endpoint: string,
    token: string | null,
    payload: any,
    headers_content_type?: string
  ) {
    return httpService.request(
      'PATCH',
      endpoint,
      token,
      payload,
      headers_content_type
    )
  },

  put(
    endpoint: string,
    token: string | null,
    payload: any,
    headers_content_type?: string
  ) {
    return httpService.request(
      'PUT',
      endpoint,
      token,
      payload,
      headers_content_type
    )
  },

  delete(endpoint: string, token: string | null, payload: any) {
    return httpService.request('DELETE', endpoint, token, payload)
  },
}

export default httpService
