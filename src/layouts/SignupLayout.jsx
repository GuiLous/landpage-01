import liquidObject from '@assets/images/liquid_object.png'
import logo from '@assets/images/logo_type_white.svg'
import { Container } from '@components'
import style from './SignupLayout.module.css'

export default function SignupLayout({ children }) {
  return (
    <Container
      className={style.container}
      align="center"
      justify="center"
      column
    >
      <Container className={style.liquidObject}>
        <img src={liquidObject} alt="Liquid object" />
      </Container>

      <Container className={style.brand} align="end">
        <img src={logo} alt="Reload logo" />
      </Container>

      {children}
    </Container>
  )
}
