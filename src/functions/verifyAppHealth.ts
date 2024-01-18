import { NextRequest, NextResponse } from 'next/server'

import { appApi } from '@/modelsApi'

interface App {
  maintenance: boolean
  beta_required: boolean
  invite_required: boolean
}

export async function verifyAppHealth(req: NextRequest): Promise<App> {
  const { nextUrl } = req

  const response = await appApi.healthCheck({ cache: 'no-cache' })

  const homeUrl = new URL('/not-found', nextUrl.origin)

  if (response.errorMsg) NextResponse.redirect(homeUrl)

  return response
}
