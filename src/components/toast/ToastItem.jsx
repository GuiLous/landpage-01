import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  RiCloseCircleFill,
  RiInformationFill,
  RiErrorWarningFill,
  RiCheckboxCircleFill,
} from 'react-icons/ri'

import { removeToast } from '@slices/ToastSlice'
import { Container } from '@components'
import style from './ToastItem.module.css'

export default function ToastItem(props) {
  const dispatch = useDispatch()
  const [timer, setTimer] = useState(props.duration - 1)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let interval

    if (timer >= 0) {
      interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
    } else {
      setLeaving(true)
      setTimeout(() => {
        dispatch(dispatch(removeToast(props.id)))
      }, 250)
    }

    return () => interval && clearTimeout(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  const iconMap = {
    info: <RiInformationFill />,
    warning: <RiErrorWarningFill />,
    danger: <RiCloseCircleFill />,
    success: <RiCheckboxCircleFill />,
  }

  return (
    <Container
      className={[
        style.container,
        style[props.type],
        leaving ? style.leaving : null,
      ].join(' ')}
    >
      <Container className={style.indicator}>{iconMap[props.type]}</Container>

      <Container column className={style.content}>
        {props.title && (
          <Container className={style.title}>
            <p>{props.title}</p>
          </Container>
        )}

        <p>{props.content}</p>
      </Container>
    </Container>
  )
}

ToastItem.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'danger', 'success', 'warning']),
  duration: PropTypes.number,
  fixed: PropTypes.bool,
  title: PropTypes.string,
}

ToastItem.defaultProps = {
  type: 'info',
  duration: 10,
}
