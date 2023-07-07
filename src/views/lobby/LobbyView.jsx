import { Badge, Icon, Text, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LobbiesAPI, PreMatchesAPI } from '@api'
import {
  ArrowUpFilledIcon,
  Container,
  JoystickIcon,
  LobbyLineup,
  MatchFoundModal,
} from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { removeRestartQueue } from '@slices/LobbySlice'

import style from './LobbyView.module.css'

export default function LobbyView() {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  const user = useSelector((state) => state.user)
  const lobby = useSelector((state) => state.lobby)
  const preMatch = useSelector((state) => state.preMatch)
  const match = useSelector((state) => state.match)

  const dispatch = useDispatch()

  const [openMatchFoundModal, setOpenMatchFoundModal] = useState(false)

  const userPlayer = lobby.players?.find((player) => player.user_id === user.id)
  const otherPlayers = lobby.players?.filter(
    (player) => player.user_id !== user.id
  )

  useEffect(() => {
    const lockIn = async () => {
      const userToken = StorageService.get('token')
      let response = null

      response = await PreMatchesAPI.playerLockIn(userToken, preMatch.id)

      if (response.errorMsg) {
        dispatch(
          addToast({
            content: response.errorMsg,
            variant: 'error',
          })
        )
      }
    }

    if (preMatch && preMatch.state === 'pre_start') lockIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preMatch])

  useEffect(() => {
    const restartQueue = async () => {
      const userToken = StorageService.get('token')
      let response

      response = await LobbiesAPI.startQueue(userToken, lobby.id)

      if (response.errorMsg) {
        dispatch(
          addToast({
            content: response.errorMsg,
            variant: 'error',
          })
        )
      }
    }

    if (lobby && lobby.restart) {
      restartQueue()
      dispatch(removeRestartQueue())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby])

  useEffect(() => {
    if (preMatch && preMatch.state === 'lock_in') setOpenMatchFoundModal(true)
    else setOpenMatchFoundModal(false)
  }, [preMatch])

  return (
    <Container
      className={style.container}
      column
      gap={isLessThan2xl ? 30 : 40}
      align="center"
    >
      <Container className={style.header} gap={12} fitContent>
        <Icon
          as={JoystickIcon}
          color="white"
          fontSize={{ base: 30, md: 28, '2xl': 30 }}
        />
        <Container gap={8}>
          <Text
            fontSize={{ base: 20, md: 18, '2xl': 20 }}
            fontWeight="light"
            textTransform="uppercase"
          >
            Suba de nível e
          </Text>
          <Text
            fontSize={{ base: 20, md: 18, '2xl': 20 }}
            fontWeight="semibold"
            textTransform="uppercase"
          >
            fique entre os melhores
          </Text>
        </Container>
      </Container>

      {/*
        TODO: move the following into its own component when
        we have more then one game mode available
      */}
      <Container className={style.gameType} fitContent>
        <Container
          className={style.gameTypeItem}
          justify="center"
          gap={12}
          align="center"
        >
          <Text fontSize={{ base: 18, md: 16, '2xl': 18 }}>TDM 5x5</Text>
          <Badge paddingBottom={{ base: '4px', md: '3px', '2xl': '4px' }}>
            Em breve
          </Badge>
        </Container>

        <Container
          className={[style.gameTypeItem, style.active].join(' ')}
          justify="center"
          gap={12}
          align="center"
        >
          <Container className={style.arrowUpIcon} justify="center">
            <Icon as={ArrowUpFilledIcon} color="primary.400" />
          </Container>
          <Text fontSize={{ base: 18, md: 16, '2xl': 18 }}>Ranqueada 5x5</Text>
        </Container>

        <Container
          className={style.gameTypeItem}
          justify="center"
          gap={12}
          align="center"
        >
          <Text fontSize={{ base: 18, md: 16, '2xl': 18 }}>Personalizada</Text>
          <Badge paddingBottom={{ base: '4px', md: '3px', '2xl': '4px' }}>
            Em breve
          </Badge>
        </Container>
      </Container>

      <Container className={style.lineup}>
        <LobbyLineup
          userPlayer={userPlayer}
          otherPlayers={otherPlayers}
          lobby={lobby}
          preMatch={preMatch}
          match={match}
        />
      </Container>

      <MatchFoundModal
        isOpen={openMatchFoundModal}
        setIsOpen={setOpenMatchFoundModal}
        preMatch={preMatch}
      />
    </Container>
  )
}
