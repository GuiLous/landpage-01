import { Button, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { SiSteam } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'

import { Container, LevelBadge, UserIcon } from '@components'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { addInviteSent } from '@slices/UserSlice'
import style from './InviteListItem.module.css'

export default function InviteListItem(props) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const invited =
    user.account.lobby_invites_sent.filter((invite) => {
      return invite.to_player.id === props.id
    }).length > 0

  const isAvailable = () => {
    if (invited || user.account.lobby.queue) return false

    switch (props.status) {
      case 'online':
        return true

      case 'offline':
        return false

      case 'away':
        return true

      case 'in_game':
        return false

      case 'teaming':
        return true

      case 'queued':
        return false

      default:
        return false
    }
  }

  const handleInvite = async () => {
    if (!isAvailable()) return

    const token = StorageService.get('token')

    const response = await HttpService.post(
      `mm/lobby/${user.account.lobby.id}/invite-player/${props.id}/`,
      token
    )

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
      return
    }

    dispatch(addInviteSent(response))
  }

  return (
    <Container className={style.container} align="center" justify="center">
      <Container align="center" gap={14}>
        <Container
          className={style.level}
          align="center"
          fitContent
          style={{ top: props.level < 10 && 4 }}
        >
          <LevelBadge level={props.level} size="sm" />
        </Container>
        <Text className={style.username}>{props.username}</Text>
      </Container>

      <Container align="center" gap={24} fitContent>
        <Container
          className={style.actions}
          gap={10}
          align="center"
          justify="end"
        >
          <Container
            align="center"
            justify="center"
            fitContent
            className={style.actionLink}
          >
            <Icon as={UserIcon} fontSize="20px" />
          </Container>

          <Container
            align="center"
            justify="center"
            fitContent
            className={style.actionLink}
          >
            <Icon as={SiSteam} fontSize="20px" />
          </Container>
        </Container>

        <Button size="sm" onClick={handleInvite} isDisabled={invited}>
          {invited ? 'Convidado' : 'Convidar'}
        </Button>
      </Container>
    </Container>
  )
}
