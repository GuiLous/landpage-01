import { Icon } from '@chakra-ui/react'
import { AiFillCaretUp } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import { Container } from '@components'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import style from './LobbyModeSelector.module.css'

export default function LobbyModeSelector({ lobby, disabled }) {
  const dispatch = useDispatch()

  const handleToggleMode = async (lobbyType, lobbyMode) => {
    if (lobby.players_count > 1 || lobby.queue) return

    const token = StorageService.get('token')
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/change-type/${lobbyType}/change-mode/${lobbyMode}`,
      token
    )
    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  return (
    <Container
      className={[
        style.typeSelection,
        (lobby.queue || lobby.players_count > 1 || disabled) && style.disabled,
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
