import { useEffect, useState } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { BsCheckCircleFill } from 'react-icons/bs'
import { RiCloseCircleFill, RiErrorWarningFill } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { storageService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/store'
import { Variant, removeToast } from '@/store/slices/appSlice'

import { lobbyApi } from '@/api'

import { Avatar, Button } from '@/components/shared'

import { useShowErrorToast } from '@/hooks'

interface ToastProps {
  id: number
  content?: string
  variant: Variant
  duration?: number
  title?: string
  avatar?: string
  invite_id?: string
}

export function Toast({
  id,
  content = '',
  variant,
  duration = 6,
  title,
  avatar,
  invite_id,
}: ToastProps) {
  const { invites } = useAppSelector((state) => state.invites)

  const dispatch = useAppDispatch()
  const showErrorToast = useShowErrorToast()

  const dynamicDuration = content.length <= 67 ? duration : 10

  const [timer, setTimer] = useState(dynamicDuration - 1)
  const [defaultTitle, setDefaultTitle] = useState(title)

  const invite = invites.find((item) => item.id === invite_id)

  const handleClose = () => {
    setTimer(-1)
  }

  const handleAccept = async () => {
    const userToken = storageService.get('token')
    if (!userToken || !invite_id) return

    const response = await lobbyApi.acceptInvite(userToken, invite_id)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)
    }

    handleClose()
  }

  const renderIcon = () => {
    switch (variant) {
      case 'success':
        return <BsCheckCircleFill className="text-green-400" size={16} />

      case 'warning':
        return <RiErrorWarningFill className="text-yellow-400" />

      case 'error':
        return <RiCloseCircleFill className="text-red-500" />

      case 'invite':
      case 'notification':
        return <Avatar avatarUrl={avatar} sm />

      default:
        return <AiFillBell className="text-purple-400" size={16} />
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (timer >= 0) {
      interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
    } else {
      clearInterval(interval)
      dispatch(removeToast(id))
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [timer, dispatch, id])

  useEffect(() => {
    if (title) return

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
    <div className="relative flex-col overflow-hidden rounded bg-gray-1100 opacity-90 transition-opacity hover:opacity-100">
      <div
        className={twMerge(
          'gap-4 rounded p-3.5 bg-gradient_toast_info',
          variant === 'success' && 'bg-gradient_toast_success',
          variant === 'error' && 'bg-gradient_toast_error',
          variant === 'warning' && 'bg-gradient_toast_warning'
        )}
      >
        <div className="items-center gap-4">
          <div
            className={twMerge(
              'items-center justify-center border-[5px] border-gray-900 rounded-[50%] text-xl min-h-[32px] max-w-[32px] min-w-[32px] max-h-[32px] overflow-hidden',
              invite_id && 'border-0'
            )}
          >
            {renderIcon()}
          </div>

          <div className="items-center gap-[1.125rem]">
            <div className="flex-col">
              <div>
                <span
                  className={twMerge(
                    'text-sm font-medium text-white',
                    variant === 'invite' && 'text-purple-300'
                  )}
                >
                  {title || defaultTitle}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-100">{content}</p>
              </div>
            </div>

            {variant === 'invite' && (
              <Button.Root
                className="max-h-[32px] min-h-[32px] max-w-[80px] px-4"
                onClick={handleAccept}
              >
                <Button.Content className="text-sm font-semibold">
                  Aceitar
                </Button.Content>
              </Button.Root>
            )}
          </div>
        </div>

        <div
          className="min-h-full max-w-fit flex-initial cursor-pointer"
          onClick={handleClose}
        >
          <RxCross1 className="text-xs text-white transition-colors hover:text-gray-300" />
        </div>
      </div>

      <div
        className={twMerge(
          'max-h-[5px] max-w-0 min-h-[5px] animate-progress bg-purple-400',
          variant === 'success' && 'bg-green-400',
          variant === 'error' && 'bg-red-500',
          variant === 'warning' && 'bg-yellow-400'
        )}
        style={{ animationDuration: `${dynamicDuration}s` }}
      />
    </div>
  )
}
