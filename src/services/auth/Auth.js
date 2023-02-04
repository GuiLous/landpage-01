import { HttpService } from '@services'

export const AuthService = {
  async login(token) {
    if (!token) return null
    let response

    try {
      response = await HttpService.get('accounts/auth/', token)
    } catch (error) {
      return null
    }

    if (response.errorMsg) return null
    else return response
  },
}

export default AuthService
