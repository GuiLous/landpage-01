import { Link, Text } from '@chakra-ui/react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Outlet } from 'react-router-dom'

import liquidObject from '@assets/images/liquid_object.png'
import logo from '@assets/images/logo_type_white.svg'
import rectangle from '@assets/images/signup_bg_top_right.png'

import { Container, Footer } from '@components'
import { StorageService } from '@services'

import style from './SignupLayout.module.css'

export default function SignupLayout() {
  const handleCancel = () => {
    StorageService.remove('token')
    window.location.href = '/'
  }

  return (
    <Container className={style.container} align="center" column>
      <Container fitContent className={style.cancelBtn}>
        <Link
          as="button"
          display="flex"
          alignItems="center"
          gap="10px"
          fontWeight="medium"
          width="fit-content"
          onClick={handleCancel}
        >
          <IoIosArrowRoundBack size={31} />
          <Text>Cancelar e sair</Text>
        </Link>
      </Container>

      <Container className={style.liquidObject}>
        <img src={liquidObject} alt="Liquid object" />
      </Container>

      <img src={rectangle} alt="rectangle" className={style.rectangleImg} />

      <Container align="center" justify="center" column gap={55}>
        <Container
          className={style.brand}
          justify="center"
          align="end"
          fitContent
        >
          <img src={logo} alt="Reload logo" />
        </Container>

        <Outlet />
      </Container>

      <Footer />
    </Container>
  )
}
