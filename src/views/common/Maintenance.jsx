import { Button, Image, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AccountsAPI, AppAPI } from '@api'
import { Container, Footer } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { updateMaintenance } from '@slices/MaintenanceSlice'

import alert from '@assets/images/alert.png'
import logo from '@assets/images/logo_type_white.svg'

import style from './Maintenance.module.css'

const TIME_TO_CHECK_AGAIN = 1000 * 60 * 1 // 1 minute

export default function MaintenanceView() {
  const maintenance = useSelector((state) => state.maintenance)

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

  useEffect(() => {
    const fetchData = async () => {
      const userToken = StorageService.get('token')
      let response

      response = await AppAPI.healthCheck(userToken)

      if (response.errorMsg) {
        dispatch(
          addToast({
            content: response.errorMsg,
            variant: 'error',
          })
        )

        return
      }

      if (!response.maintenance) {
        dispatch(updateMaintenance(false))
        dispatch(
          addToast({
            title: 'A manutenção foi finalizada',
            content:
              'Filas e convites de lobby estão habilitados novamente. GLHF!',
            variant: 'warning',
          })
        )
      }
    }

    if (maintenance) {
      fetchData()

      const interval = setInterval(fetchData, TIME_TO_CHECK_AGAIN)

      return () => {
        clearInterval(interval)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maintenance])

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
