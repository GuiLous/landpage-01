import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { getJwtSecretKey, httpService } from '@/services'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const cookieStore = cookies()

  const token = searchParams.get('token')

  if (!token) return redirect('/not-found')

  const userResponse = await httpService.get('accounts/auth/', token, {
    cache: 'no-cache',
  })

  if (userResponse.errorMsg) {
    if (userResponse.errorMsg === 'Usuário deve ser convidado.') {
      cookieStore.set({
        name: 'tried_login',
        value: '',
        path: '/',
      })

      return redirect('/em-breve')
    }

    if (userResponse.errorMsg === 'Não autorizado.') {
      return redirect('/not-found')
    }

    if (userResponse.detail === 'Não autorizado.') {
      return redirect('/not-found')
    }
  }

  const jwtToken = await new SignJWT({
    id: userResponse.id,
    email: userResponse.email,
    username: userResponse?.account?.username || null,
    is_active: userResponse.is_active,
    is_verified: userResponse?.account?.is_verified || false,
    token,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getJwtSecretKey())

  cookieStore.set({
    name: 'token',
    value: jwtToken,
    path: '/',
  })

  if (!userResponse.is_active) return redirect('/conta-inativa')

  if (!userResponse?.account?.username) return redirect('/cadastrar')

  if (!userResponse?.account?.is_verified) return redirect('/verificar')

  return redirect('/jogar')
}
