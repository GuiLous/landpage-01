import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container } from '@components'
import style from './Verify.module.css'

export default function VerifyView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !user.account || user.account.is_verified) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className={style.verifyForm}>
      <p>Verify Form</p>
    </Container>
  )
}
