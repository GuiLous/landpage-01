import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container } from '@components'
import style from './Signup.module.css'

export default function SignupView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.account) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className={style.steamSignin}>
      <p>Signup Form</p>
    </Container>
  )
}
