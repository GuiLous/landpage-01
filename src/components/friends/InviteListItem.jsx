import { Avatar, Icon, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { LobbiesAPI } from '@api'
import { AcceptIcon, Container, RefuseIcon } from '@components'
import { useHumanizeStatus } from '@hooks'
import { addToast } from '@slices/AppSlice'

import style from './InviteListItem.module.css'

export default function InviteListItem({
  invite_id,
  avatar,
  status,
  username,
}) {
  const humanStatus = useHumanizeStatus(status)
  const dispatch = useDispatch()

  const handleAccept = async () => {
    const response = await LobbiesAPI.acceptInvite()

    if (response.errorMsg) {
      dispatch(
        addToast({
          title: 'Algo saiu errado...',
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  const handleRefuse = async () => {
    const response = await LobbiesAPI.refuseInvite()

    if (response.errorMsg) {
      dispatch(
        addToast({
          title: 'Algo saiu errado...',
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  return (
    <Container className={style.container} align="stretch">
      <Container className={style.userInfo} align="center" gap={8}>
        <Container fitContent>
          <Avatar variant={status} src={avatar} />
        </Container>

        <Container column>
          <Text fontSize={14} fontWeight="medium" color="white">
            {username}
          </Text>
          <Text fontSize={12} fontWeight="medium" color="gray.700">
            {humanStatus}
          </Text>
        </Container>
      </Container>

      <Container className={style.actions} align="center">
        <Container
          className={style.actionBtn}
          fitContent
          align="center"
          onClick={handleRefuse}
        >
          <Icon as={RefuseIcon} color="danger.400" fontSize={20} />
        </Container>

        <Container
          className={style.actionBtn}
          fitContent
          align="center"
          onClick={handleAccept}
        >
          <Icon as={AcceptIcon} color="success" fontSize={20} />
        </Container>
      </Container>
    </Container>
  )
}
