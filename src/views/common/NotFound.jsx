import { Button, Image, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { Container, Footer } from '@components'

import text404 from '@assets/images/404.png'
import errorPage from '@assets/images/error_page.png'
import logo from '@assets/images/logo_type_white.svg'

import style from './NotFound.module.css'

export default function NotFoundView() {
  return (
    <Container className={style.container}>
      <Container
        column
        gap={90}
        align="center"
        justify="center"
        style={{ paddingBottom: '40px' }}
      >
        <Container justify="center" fitContent>
          <Image src={logo} alt="Logo" width={200} />
        </Container>

        <Container justify="center" align="center" fitContent column gap={40}>
          <Image src={text404} alt="404" width={295} />
          <Image src={errorPage} alt="Error page" width={295} />
        </Container>

        <Container column fitContent justify="center" align="center" gap={40}>
          <Text fontSize={16} color="white" textAlign="center">
            Ops! Parece que você achou a página de erro 404.
            <br />
            Mas não se preocupe, vamos te guiar até uma página segura.
          </Text>

          <Button borderRadius="4px" px={45} as={RouterLink} to="/">
            <Text
              textTransform="uppercase"
              fontSize={14}
              fontWeight="bold"
              color="white"
            >
              Voltar para o início
            </Text>
          </Button>
        </Container>
      </Container>
      <Footer />
    </Container>
  )
}
