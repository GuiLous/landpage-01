import { redirect } from 'next/navigation'

import { appApi } from '@/modelsApi'

interface App {
  maintenance: boolean
  beta_required: boolean
  invite_required: boolean
}

export async function verifyAppHealth(): Promise<App> {
  const response = await appApi.healthCheck({ cache: 'no-cache' })

  if (response.errorMsg) return redirect('/not-found')

  return response
}
