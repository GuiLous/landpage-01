import { Avatar, AvatarBadge, Icon, Text } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { LobbiesAPI } from '@api'
import { Container } from '@components'
import { useHumanizeStatus } from '@hooks'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'
import { addInvite } from '@slices/InviteSlice'

import style from './FriendListGroupItem.module.css'

const colorsStatus = {
  online: 'green.600',
  offline: 'gray.300',
  away: 'salmon.500',
  in_game: 'yellow.400',
  teaming: 'purple.300',
  queued: 'yellow.400',
}

export default function FriendListGroupItem({
  user_id,
  status,
  avatar,
  username,
  lobby_id,
}) {
  const user = useSelector((state) => state.user)
  const lobby = useSelector((state) => state.lobby)

  const invites = useSelector((state) => state.invites)

  const dispatch = useDispatch()
  let humanStatus = useHumanizeStatus(status)

  humanStatus += status === 'in_game' ? ' (RANKED 5X5)' : ''

  const userToken = StorageService.get('token')
  const availableStatuses = ['online', 'away', 'teaming']
  const alreadyInvitedByFriend = lobby.invited_players_ids.some(
    (id) => id === user_id
  )
  const alreadyInvited =
    invites.filter((invite) => invite.to_player.user_id === user_id).length >
      0 || alreadyInvitedByFriend
  const alreadyOnTeam = user.lobby_id === lobby_id

  const isAvailable =
    !alreadyOnTeam && availableStatuses.includes(status) && !lobby.queue

  const handleInvite = async () => {
    if (!isAvailable || alreadyInvited || alreadyOnTeam) return
    const response = await LobbiesAPI.createInvite(
      userToken,
      user.lobby_id,
      user.id,
      user_id
    )

    if (response.errorMsg)
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    else if (response) {
      dispatch(addInvite(response))
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
        status === 'offline' && style.offline,
      ].join(' ')}
      gap={14}
      align="center"
      testID="invite-button"
      fitContent
    >
      <Container fitContent>
        <Avatar
          variant={status}
          src={avatar}
          size={{ base: 'md', md: 'smd', '2xl': 'md' }}
        >
          <AvatarBadge borderColor="gray.1000" />
        </Avatar>
      </Container>

      <Container column gap={4}>
        <Text fontSize={12} fontWeight="medium" color="white">
          {username}
        </Text>
        <Text fontSize={10} fontWeight="medium" color={colorsStatus[status]}>
          {alreadyOnTeam ? 'No seu grupo' : humanStatus}
        </Text>
      </Container>

      <Icon
        as={BsThreeDots}
        fill="white"
        fontSize={18}
        data-testid="icon-available"
        className={style.dotsIcon}
      />
    </Container>
  )
}
