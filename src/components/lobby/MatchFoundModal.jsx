import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { Container, Timer, UserIcon } from '@components'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import style from './MatchFoundModal.module.css'

export default function MatchFoundModal({ preMatch }) {
  const dispatch = useDispatch()

  const handleClose = () => {}

  const playersLeft = preMatch.players_total - preMatch.players_ready_count

  const handleAccept = async () => {
    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/match/${preMatch.id}/player-ready/`,
      token
    )
    if (response && response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  const renderPlayers = Array(preMatch.players_total)
    .fill()
    .map((x, i) => (
      <Container fitContent className={style.userIcon} key={i}>
        <Icon
          as={UserIcon}
          style={{ fontSize: '38px', opacity: i < playersLeft ? 0.5 : 1 }}
        />
      </Container>
    ))
    .reverse()

  return (
    <Modal
      size="3xl"
      isCentered
      isOpen
      onClose={handleClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Container justify="center">Partida Encontrada!</Container>
          <Container justify="center" className={style.substitle}>
            Ranqueada · 5x5
          </Container>
        </ModalHeader>

        <ModalBody>
          <Container column align="center" style={{ marginTop: '20px' }}>
            <Container justify="center" gap={12}>
              {renderPlayers}
            </Container>

            <Container justify="center" style={{ marginTop: '40px' }}>
              <Button isDisabled={preMatch.user_ready} onClick={handleAccept}>
                {preMatch.user_ready ? 'Você está pronto!' : 'Aceitar partida'}
              </Button>
            </Container>

            <Container justify="center" style={{ marginTop: '14px' }}>
              <Timer
                reverse
                formatted={false}
                initialTime={preMatch.countdown}
              />
            </Container>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
