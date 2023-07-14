import { Avatar, Button, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LobbiesAPI } from '@api'
import {
  BellCircleIcon,
  CheckCircleIcon,
  CloseCircleIcon,
  CloseIcon,
  Container,
  WarningCircleIcon,
} from '@components'
import { StorageService } from '@services'
import { addToast, removeToast } from '@slices/AppSlice'

import style from './ToastListItem.module.css'

export default function ToastListItem({
  id,
  content = '',
  variant,
  duration = 6,
  title = null,
  avatar = null,
  invite_id = null,
}) {
  const dispatch = useDispatch()
  const invites = useSelector((state) => state.invites)

  const dynamicDuration = content.length <= 67 ? duration : 10

  const [timer, setTimer] = useState(dynamicDuration - 1)
  const [defaultTitle, setDefaultTitle] = useState(title)

  const invite = invites.find((item) => item.id === invite_id)

  const handleClose = () => {
    setTimer(-1)
  }

  const handleAccept = async () => {
    const userToken = StorageService.get('token')
    const response = await LobbiesAPI.acceptInvite(userToken, invite_id)

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }

    handleClose()
  }

  const renderIcon = () => {
    switch (variant) {
      case 'success':
        return <Icon as={CheckCircleIcon} color="green.400" />

      case 'warning':
        return <Icon as={WarningCircleIcon} color="yellow.400" />

      case 'error':
        return <Icon as={CloseCircleIcon} color="red.500" />

      case 'invite':
      case 'notification':
        return <Avatar variant="teaming" src={avatar} size="sm" />

      default:
        return <Icon as={BellCircleIcon} color="purple.400" />
    }
  }

  useEffect(() => {
    let interval

    if (timer >= 0) {
      interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
    } else {
      clearTimeout(interval)
      dispatch(removeToast(id))
    }

    return () => interval && clearTimeout(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  useEffect(() => {
    if (title !== null) return

    switch (variant) {
      case 'success':
        setDefaultTitle('Tudo certo!')
        break

      case 'error':
        setDefaultTitle('Algo saiu errado...')
        break

      case 'warning':
        setDefaultTitle('Atenção!')
        break

      case 'invite':
        setDefaultTitle('Info')
        break

      default:
        setDefaultTitle('Info')
        break
    }
  }, [variant, title])

  useEffect(() => {
    if (invite_id && !invite) handleClose()
  }, [invite, invite_id])

  return (
    <Container
      className={[style.container, style[variant]].join(' ')}
      column
      testID="container"
    >
      <Container className={style.containerWrapper} gap={16}>
        <Container align="center" gap={16}>
          <Container
            className={invite_id ? style.avatarWrapper : style.iconWrapper}
            align="center"
            justify="center"
          >
            {renderIcon()}
          </Container>

          <Container align="center" gap={18}>
            <Container column>
              <Container className={style.title}>
                <Text
                  fontSize={14}
                  fontWeight="medium"
                  color={variant === 'invite' ? 'purple.300' : 'white'}
                >
                  {title || defaultTitle}
                </Text>
              </Container>
              <Container className={style.content}>
                <Text fontSize={12} color="gray.100">
                  {content}
                </Text>
              </Container>
            </Container>

            {variant === 'invite' && (
              <Button
                maxW="80px"
                maxH="32px"
                minH="32px"
                onClick={handleAccept}
              >
                Aceitar
              </Button>
            )}
          </Container>
        </Container>

        <Container className={style.closeBtn} fitContent onClick={handleClose}>
          <Icon as={CloseIcon} fill="white" />
        </Container>
      </Container>

      <Container
        className={style.countdownBar}
        style={{ animationDuration: `${dynamicDuration}s` }}
      ></Container>
    </Container>
  )
}
