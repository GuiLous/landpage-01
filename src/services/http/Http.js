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
		const url = REACT_APP_API_URL + '/api' + endpoint + '/'

		let headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
		if (token)
			headers = { ...HttpService.headers, Authorization: 'Bearer ' + token }

		let request = {
			method: method,
			headers: headers,
		}

		if (payload) request = { ...request, body: JSON.stringify(payload) }

		const response = await fetch(url, request)
		let errorMsg =
			custom_unknown_error ||
			'Ocorreu um erro desconhecido. Tente novamente mais tarde.'

		if (response) {
			if (response.status < 400) return await response.json()
			else if (response.status >= 400 && response.status < 500) {
				const json = await response.json()
				if (Array.isArray(json.detail)) errorMsg = json.detail[0].msg
				else errorMsg = json.detail
			}
		}

		return { error: errorMsg }
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
