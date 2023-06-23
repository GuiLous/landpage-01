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
import { removeToast } from '@slices/AppSlice'
import style from './ToastListItem.module.css'

export default function ToastListItem({
  id,
  content,
  variant,
  duration = 6,
  title = null,
}) {
  const dispatch = useDispatch()
  const [timer, setTimer] = useState(duration - 1)
  const [defaultTitle, setDefaultTitle] = useState(title)

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

      default:
        setDefaultTitle('Info')
        break
    }
  }, [variant, title])

  const handleClose = () => {
    setTimer(-1)
  }

  const renderIcon = () => {
    switch (variant) {
      case 'success':
        return <Icon as={CheckCircleIcon} color="success" />

      case 'warning':
        return <Icon as={WarningCircleIcon} color="warning" />

      case 'error':
        return <Icon as={CloseCircleIcon} color="danger.400" />

      default:
        return <Icon as={BellCircleIcon} color="primary.400" />
    }
  }

  return (
    <Container
      className={[style.container, style[variant]].join(' ')}
      column
      testID="container"
    >
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
              <Text fontSize={14} fontWeight="medium">
                {title || defaultTitle}
              </Text>
            </Container>
            <Container className={style.content}>
              <Text fontSize={12} color="gray.625">
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
