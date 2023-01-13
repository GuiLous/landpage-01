import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AuthService, StorageService } from '@services'
import { update } from '@slices/UserSlice'

export default function TokenLogin(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [fetching, setFetching] = useState(true)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetch = async (token) => {
      const response = await AuthService.login(token)
      if (response.error) {
        StorageService.remove('token')
        dispatch(update(null))
        if (props.redirect) navigate('/')
      }
      dispatch(update(response))

      if (
        props.verifiedRequired &&
        props.redirect &&
        (!response.account || !response.account.is_verified)
      ) {
        navigate('/')
      }

      setFetching(false)
    }

    const token = StorageService.get('token')
    if (token && !user) fetch(token)
    else if (!token && props.redirect) navigate('/')
    else setFetching(false)
  })

  return fetching ? <p>Carregando...</p> : props.children
}
