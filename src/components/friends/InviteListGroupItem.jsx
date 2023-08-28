import { Avatar, AvatarBadge, Icon, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { LobbiesAPI } from '@api'
import { AcceptIcon, CloseIcon, Container } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import style from './InviteListGroupItem.module.css'

export default function InviteListGroupItem({
  invite_id,
  avatar,
  status,
  username,
}) {
  const dispatch = useDispatch()
  const userToken = StorageService.get('token')

  const handleAccept = async () => {
    const response = await LobbiesAPI.acceptInvite(userToken, invite_id)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  const handleRefuse = async () => {
    const response = await LobbiesAPI.refuseInvite(userToken, invite_id)

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
    <Container className={style.container} align="stretch">
      <Container className={style.userInfo} align="center" gap={14}>
        <Container fitContent>
          <Avatar
            variant={status}
            src={avatar}
            size={{ base: 'md', md: 'smd', '2xl': 'md' }}
          >
            <AvatarBadge borderColor="purple.600" />
          </Avatar>
        </Container>

        <Container column gap={4}>
          <Text
            fontSize={{ base: 14, md: 12, '2xl': 14 }}
            fontWeight="medium"
            color="white"
          >
            {username}
          </Text>
          <Text
            fontSize={{ base: 12, md: 10, '2xl': 12 }}
            fontWeight="medium"
            color="purple.300"
            minW="95px"
          >
            Convidou você
          </Text>
        </Container>
      </Container>

      <Container align="center" justify="end" gap={14}>
        <Container
          className={style.actionBtn}
          fitContent
          align="center"
          onClick={handleAccept}
          testID="acceptInvite"
        >
          <Icon
            as={AcceptIcon}
            color="green.600"
            fontSize={20}
            _hover={{ color: 'green.500', transform: 'scale(1.1)' }}
            transition="all 0.2s ease-in-out"
          />
        </Container>

        <Container
          className={style.actionBtn}
          fitContent
          align="center"
          onClick={handleRefuse}
          testID="refuseInvite"
        >
          <Icon
            as={CloseIcon}
            color="gray.300"
            fontSize={12}
            _hover={{ color: 'white' }}
            transition="all 0.2s ease-in-out"
          />
        </Container>
      </Container>
    </Container>
  )
}
