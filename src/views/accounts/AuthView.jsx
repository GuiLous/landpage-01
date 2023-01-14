import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthService, StorageService } from '@services'
import { updateUser } from '@slices/UserSlice'

export default function AuthView() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const redirectUser = (user) => {
      if (!user) navigate('/')
      else if (!user.account) navigate('/cadastrar')
      else if (!user.account.is_verified) navigate('/verificar')
      else navigate('/jogar')
    }

    const fetch = async (token) => {
      const response = await AuthService.login(token)

      if (response) {
        dispatch(updateUser(response))
        StorageService.set('token', token)
        redirectUser(response)
      } else {
        navigate('/')
      }
    }

    const token = searchParams.get('token') || StorageService.get('token')
    if (!token) navigate('/')

    if (user) redirectUser(user)
    else fetch(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <p>Carregando...</p>
}
