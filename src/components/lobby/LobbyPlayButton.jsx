import { Icon, Text } from '@chakra-ui/react'

import { BlockIcon, CloseIcon, Container, Timer } from '@components'

import style from './LobbyPlayButton.module.css'

export default function LobbyPlayButton({
  queueTime,
  countdown,
  disabled,
  restricted,
  onClick,
  title = 'Jogar',
}) {
  return (
    <Container
      className={[
        style.container,
        disabled && style.disabled,
        restricted && style.restricted,
        queueTime && style.queued,
      ].join(' ')}
      onClick={onClick}
      column
      align="center"
      justify="center"
      testID="container"
    >
      {restricted && (
        <Container
          className={style.restrictedText}
          align="center"
          justify="center"
        >
          <Text fontSize={14} fontWeight={'semibold'} textTransform="uppercase">
            Grupo com restrição
          </Text>
        </Container>
      )}

      {countdown && (
        <Container
          className={style.restrictedTime}
          align="center"
          justify="center"
          gap={4}
        >
          <Icon as={BlockIcon} color="white" fontSize={15} />
          <Timer initialTime={countdown} reverse />
        </Container>
      )}

      {!restricted && queueTime && (
        <Container column>
          <Container
            align="center"
            justify="center"
            className={style.queueTime}
          >
            <Timer initialTime={queueTime} />
          </Container>

          <Container
            align="center"
            justify="center"
            className={style.cancelQueue}
            gap={10}
          >
            <Icon as={CloseIcon} fontSize={16} />
            <Text fontSize={22} fontWeight="bold" textTransform="uppercase">
              Cancelar
            </Text>
          </Container>
        </Container>
      )}

      {!restricted && !queueTime && (
        <Container
          className={style.defaultText}
          align="center"
          justify="center"
        >
          <Text fontSize={28} fontWeight="bold" textTransform="uppercase">
            {title}
          </Text>
        </Container>
      )}
    </Container>
  )
}
