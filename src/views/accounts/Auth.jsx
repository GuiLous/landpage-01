import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Loading, LoadingBackdrop } from '@components'
import { AuthService, StorageService } from '@services'
import { updateMatch, updatePreMatch } from '@slices/MatchmakingSlice'
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
      else if (!user.is_active) navigate('/conta-inativa')
      else if (!user.account) navigate('/cadastrar')
      else if (!user.account.is_verified) navigate('/verificar')
      else if (
        user.account &&
        user.account.match &&
        user.account.match.status === 'loading'
      )
        navigate('/conectar')
      else navigate('/jogar')
    }

    const fetch = async (token) => {
      const response = await AuthService.login(token)

      if (response) {
        StorageService.set('token', token)
        dispatch(updateUser(response))
        if (response.account) {
          if (response.account.pre_match) {
            dispatch(updatePreMatch(response.account.pre_match))
          } else if (response.account.match) {
            dispatch(updateMatch(response.account.match))
          }
        }
        window.location.href = '/'
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

  return (
    <LoadingBackdrop>
      <Loading />
    </LoadingBackdrop>
  )
}
