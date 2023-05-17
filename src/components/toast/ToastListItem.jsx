import { Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  BellCircleIcon,
  CheckCircleIcon,
  CloseCircleIcon,
  CloseIcon,
  Container,
  WarningCircleIcon,
} from '@components'
import { removeToast } from '@slices/ToastSlice'
import style from './ToastListItem.module.css'

export default function ToastListItem({
  id,
  title,
  content,
  variant,
  duration,
}) {
  const dispatch = useDispatch()
  const [timer, setTimer] = useState(duration - 1)

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

  const handleClose = () => {
    setTimer(-1)
  }

  const renderIcon = () => {
    switch (variant) {
      case 'success':
        return <Icon as={CheckCircleIcon} fill="success" />

      case 'warning':
        return <Icon as={WarningCircleIcon} fill="warning" />

      case 'error':
        return <Icon as={CloseCircleIcon} fill="danger.400" />

      default:
        return <Icon as={BellCircleIcon} fill="primary.400" />
    }
  }

  return (
    <Container className={[style.container, style[variant]].join(' ')} column>
      <Container className={style.containerWrapper} gap={16}>
        <Container align="center" gap={16}>
          <Container
            className={style.iconWrapper}
            align="center"
            justify="center"
          >
            {renderIcon()}
          </Container>

          <Container column>
            <Container className={style.title}>
              <Text fontSize={17} fontWeight="semibold">
                {title}
              </Text>
            </Container>
            <Container className={style.content}>
              <Text fontSize={13} color="gray.700">
                {content}
              </Text>
            </Container>
          </Container>
        </Container>

        <Container className={style.closeBtn} fitContent onClick={handleClose}>
          <Icon as={CloseIcon} fill="white" />
        </Container>
      </Container>

      <Container
        className={style.countdownBar}
        style={{ animationDuration: `${duration}s` }}
      ></Container>
    </Container>
  )
}
