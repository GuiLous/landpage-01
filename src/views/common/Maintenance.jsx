import { Button, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { AccountsAPI } from '@api'
import { Container, Footer } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import alert from '@assets/images/alert.png'
import logo from '@assets/images/logo_type_white.svg'

import style from './Maintenance.module.css'

export default function MaintenanceView() {
  const dispatch = useDispatch()

  const [isFetching, setIsFetching] = useState(false)

  const handleLogout = async () => {
    setIsFetching(true)
    const token = StorageService.get('token')
    const response = await AccountsAPI.logout(token)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
      setIsFetching(false)
      return
    }

    StorageService.remove('token')
    window.location.href = '/'
  }

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

          <Button
            borderRadius="4px"
            px={45}
            isLoading={isFetching}
            disabled={isFetching}
            onClick={handleLogout}
          >
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
