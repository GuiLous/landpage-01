import { Icon } from '@chakra-ui/react'
import { AiFillCaretUp } from 'react-icons/ai'

import { Container } from '@components'
import { HttpService, StorageService, Toast } from '@services'

import React from 'react'

import style from './LobbyModeSelector.module.css'

export default function LobbyModeSelector({ lobby }) {
  const handleToggleMode = async (lobbyType, lobbyMode) => {
    if (lobby.players_count > 1 || lobby.queue) return

    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/change-type/${lobbyType}/change-mode/${lobbyMode}`,
      token
    )
    if (response.errorMsg) {
      Toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
      })
    }
  }

  return (
    <Container
      className={[
        style.typeSelection,
        (lobby.queue || lobby.players_count > 1) && style.disabled,
      ].join(' ')}
      align="center"
      justify="between"
      fitContent
    >
      <Container
        justify="center"
        className={[style.lobbyMode, lobby.mode === 1 && style.activeMode].join(
          ' '
        )}
        onClick={() => {
          handleToggleMode('competitive', 1)
        }}
      >
        Ranked 1x1
        <Container
          className={style.modeActiveCaret}
          align="center"
          justify="center"
        >
          <Icon as={AiFillCaretUp} />
        </Container>
      </Container>

      <Container
        justify="center"
        className={[style.lobbyMode, lobby.mode === 5 && style.activeMode].join(
          ' '
        )}
        onClick={() => {
          handleToggleMode('competitive', 5)
        }}
      >
        Ranked 5x5
        <Container
          className={style.modeActiveCaret}
          align="center"
          justify="center"
        >
          <Icon as={AiFillCaretUp} />
        </Container>
      </Container>

      <Container
        justify="center"
        className={[
          style.lobbyMode,
          lobby.mode === 20 && style.activeMode,
        ].join(' ')}
        onClick={() => {
          handleToggleMode('custom', 20)
        }}
      >
        Personalizada
        <Container
          className={style.modeActiveCaret}
          align="center"
          justify="center"
        >
          <Icon as={AiFillCaretUp} />
        </Container>
      </Container>
    </Container>
  )
}
