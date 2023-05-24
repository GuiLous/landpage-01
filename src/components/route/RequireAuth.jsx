import { Navigate } from 'react-router-dom'

import React from 'react'

export default function RequireAuth({ element, user, isUnverified, isNew }) {
  let redirect

  if (!user) redirect = '/'
  else if (!user.is_active) redirect = '/conta-inativa'
  else if (isNew) redirect = '/cadastrar'
  else if (isUnverified) redirect = '/verificar'

  return redirect ? <Navigate to={redirect} replace /> : element
}
