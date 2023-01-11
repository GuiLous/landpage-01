import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container } from '@components'

import heroImg from '@assets/images/home_hero.png'
import logo from '@assets/images/logo_type_white.svg'
import style from './Home.module.css'

export default function HomeView() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.account && user.account.is_verified) navigate('/jogar')
  })

  return (
    <Container align="center" justify="center" className={style.container}>
      <Container className={style.heroImg} align="center" justify="end">
        <img src={heroImg} alt="Personagem do GTA 5" />
      </Container>

      <Container column className={style.hero} justify="center" gap={25}>
        <Container className={style.brand}>
          <img src={logo} alt="Reload" />
        </Container>

        <Container className={style.description}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut
            tellus ex. Sed in orci risus. Morbi qui lacus eget tellus tristique
            congue.
          </p>
        </Container>
      </Container>
    </Container>
  )
}
