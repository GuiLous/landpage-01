import { Icon, Text } from '@chakra-ui/react'

import { BlockIcon, CloseIcon, Container, Timer } from '@components'

import { formatSecondsToMinutes } from '@utils'

import style from './LobbyPlayButton.module.css'

export default function LobbyPlayButton({
  queueTime,
  restrictionCountdown,
  disabled,
  restricted,
  onClick,
  title = 'Jogar',
}) {
  const isQueued = queueTime !== null && queueTime !== undefined

  return (
    <Container
      className={[
        style.container,
        disabled && style.disabled,
        restrictionCountdown && style.restricted,
        isQueued && style.queued,
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

      {restrictionCountdown && (
        <Container
          className={style.restrictedTime}
          align="center"
          justify="center"
          gap={4}
        >
          <Icon as={BlockIcon} color="white" fontSize={15} />
          <Timer initialTime={restrictionCountdown} reverse />
        </Container>
      )}

      {!restricted && isQueued && (
        <Container column>
          <Container
            align="center"
            justify="center"
            className={style.queueTime}
          >
            {formatSecondsToMinutes(queueTime)}
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

      {!restricted && !isQueued && (
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
