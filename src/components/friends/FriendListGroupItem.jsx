import { Avatar, Icon, Text } from '@chakra-ui/react'
import { BsPersonFillCheck } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { LobbiesAPI } from '@api'
import { Container, GroupAddIcon } from '@components'
import { useHumanizeStatus } from '@hooks'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { addInviteSent } from '@slices/UserSlice'

import style from './FriendListGroupItem.module.css'

export default function FriendListGroupItem({
  id,
  status,
  avatar,
  username,
  lobbyId,
}) {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const humanStatus = useHumanizeStatus(status)

  const userToken = StorageService.get('token')
  const availableStatuses = ['online', 'away', 'teaming']
  const alreadyInvited =
    user.account.lobby_invites_sent.filter((invite) => {
      return invite.to_player.id === id
    }).length > 0
  const alreadyOnTeam = user.account.lobby.id === lobbyId

  const isAvailable = !alreadyOnTeam && availableStatuses.includes(status)

  const handleInvite = async () => {
    if (!isAvailable || alreadyInvited || alreadyOnTeam) return
    const response = await LobbiesAPI.createInvite(
      userToken,
      user.account.lobby.id,
      user.id,
      id
    )

    if (response.errorMsg)
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    else if (response) {
      dispatch(addInviteSent(response))
      dispatch(
        addToast({
          title: 'Convite enviado',
          variant: 'success',
        })
      )
    }
  }

  return (
    <Container
      onClick={handleInvite}
      className={[
        style.container,
        (!isAvailable || alreadyInvited) && style.disabled,
      ].join(' ')}
      gap={8}
      align="center"
      testID="action"
      fitContent
    >
      <Container fitContent>
        <Avatar variant={status} src={avatar} />
      </Container>

      <Container column>
        <Text fontSize={14} fontWeight="medium">
          {username}
        </Text>
        <Text fontSize={12} fontWeight="medium" color="gray.700">
          {humanStatus}
        </Text>
      </Container>

      {isAvailable && (
        <Container
          justify="end"
          className={style.groupAddBtn}
          data-testid="icon-wrapper"
        >
          {alreadyInvited ? (
            <Icon
              as={BsPersonFillCheck}
              fill="gray.700"
              fontSize={22}
              data-testid="icon-invited"
            />
          ) : (
            <Icon
              as={GroupAddIcon}
              fill="white"
              fontSize={26}
              data-testid="icon-available"
            />
          )}
        </Container>
      )}
    </Container>
  )
}
