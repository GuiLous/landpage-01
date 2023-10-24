import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { getJwtSecretKey, httpService } from '@/services'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const cookieStore = cookies()

  const token = searchParams.get('token')

  if (!token) redirect('/not-found')

  const userResponse = await httpService.get('accounts/auth/', token)

  if (userResponse.errorMsg) redirect('/not-found')

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
    .setExpirationTime('1h')
    .sign(getJwtSecretKey())

  cookieStore.set({
    name: 'token',
    value: jwtToken,
    path: '/',
  })

  if (!userResponse.is_active) redirect('/conta-inativa')

  if (!userResponse?.account?.username) redirect('/cadastrar')

  if (!userResponse?.account?.is_verified) redirect('/verificar')

  redirect('/jogar')
}
