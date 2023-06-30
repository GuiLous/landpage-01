import { Button, Image, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { Container, Footer } from '@components'

import alert from '@assets/images/alert.png'
import logo from '@assets/images/logo_type_white.svg'

import style from './Maintenance.module.css'

export default function MaintenanceView() {
  return (
    <Container className={style.container}>
      <Container
        column
        gap={160}
        align="center"
        justify="center"
        style={{ paddingBottom: '40px' }}
      >
        <Container justify="center" fitContent>
          <Image src={logo} alt="ReloadClub" width={200} />
        </Container>

        <Container column fitContent justify="center" align="center" gap={44}>
          <Image src={alert} alt="Alert" />

          <Text fontSize={16} color="white" textAlign="center" w="600px">
            Neste momento, ReloadClub está indisponível para uma manutenção.
            Volte mais tarde quando o serviço for restaurado.
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
