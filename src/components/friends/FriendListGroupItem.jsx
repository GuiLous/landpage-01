import { Avatar, AvatarBadge, Box, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { Container, FriendListMenu } from '@components'
import { useHumanizeStatus } from '@hooks'

import style from './FriendListGroupItem.module.css'

const colorsStatus = {
  online: 'green.600',
  offline: 'gray.300',
  away: 'salmon.500',
  in_game: 'yellow.400',
  teaming: 'yellow.400',
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

  const itemRef = useRef()

  const invites = useSelector((state) => state.invites)

  let humanStatus = useHumanizeStatus(status)

  const [openMenu, setOpenMenu] = useState(false)

  humanStatus += status === 'in_game' ? ' (RANKED 5X5)' : ''

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

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  const handleCloseMenu = () => {
    setOpenMenu(false)
  }

  useEffect(() => {
    let handler = (e) => {
      if (!itemRef.current) return
      if (!itemRef.current.contains(e.target)) {
        handleCloseMenu()
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <Box display="flex" width="100%" ref={itemRef}>
      <Container
        onClick={handleToggleMenu}
        className={[
          style.container,
          (!isAvailable || alreadyInvited) && style.disabled,
          status === 'offline' && style.offline,
        ].join(' ')}
        gap={14}
        align="center"
        testID="invite-button"
      >
        <Container fitContent className={style.avatar}>
          <Avatar
            variant={status === 'teaming' ? 'queued' : status}
            src={avatar}
            size={{ base: 'md', md: 'smd', '2xl': 'md' }}
          >
            <AvatarBadge borderColor="gray.1000" />
          </Avatar>
        </Container>

        <Container column gap={4} className={style.userInfos}>
          <Text fontSize={12} fontWeight="medium" color="white">
            {username}
          </Text>
          <Text fontSize={10} fontWeight="medium" color={colorsStatus[status]}>
            {alreadyOnTeam ? 'Em grupo' : humanStatus}
          </Text>
        </Container>

        <FriendListMenu
          open={openMenu}
          user={user}
          user_id={user_id}
          isAvailable={isAvailable}
          alreadyInvited={alreadyInvited}
          alreadyOnTeam={alreadyOnTeam}
        />
      </Container>
    </Box>
  )
}
