import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { isEmailValid, revalidatePath } from '@/utils'

import { useUserStore } from '@/store/userStore'

import { accountsApi } from '@/modelsApi'

import { Button, Input } from '@/components/shared'

import { useAuth, useShowErrorToast } from '@/hooks'

type FieldsErrors = {
  email: string
}

interface ModalSendInvitesFormProps {
  hasInvites: boolean
}

export function ModalSendInvitesForm({
  hasInvites,
}: ModalSendInvitesFormProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [email, setEmail] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [fieldsErrors, setFieldsErrors] = useState<FieldsErrors | null>(null)
  const [inviteSent, setInviteSent] = useState(false)

  const hasErrors = () => {
    return !!fieldsErrors?.email || (email !== '' && !isEmailValid(email))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (
      fieldsErrors !== null &&
      fieldsErrors.email &&
      value !== fieldsErrors.email
    ) {
      setFieldsErrors(null)
    }

    setEmail(value)
  }

  const handleKeyEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (hasErrors() || email === '') return

    setIsFetching(true)
    if (!auth?.token) return

    const response = await accountsApi.createInvite(auth.token, email)

    if (response.fieldsErrors) {
      setFieldsErrors(response.fieldsErrors)
      setIsFetching(false)
      return
    } else if (response.errorMsg) {
      showErrorToast(response.errorMsg)
      setIsFetching(false)
      return
    }

    useUserStore.getState().addUserInvite(email)

    revalidatePath({ path: '/' })

    setInviteSent(true)

    setEmail('')

    setIsFetching(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <div className="items-center justify-center gap-3">
        <Input.Root className="max-w-[308px]">
          <Input.Input
            secondary
            disabled={isFetching || !hasInvites}
            type="email"
            placeholder="email@example.com"
            id="email"
            value={email}
            error={hasErrors()}
            className={twMerge('text-sm px-4 min-h-[38px] max-h-[38px]')}
            onChange={handleChange}
            onKeyDown={handleKeyEnterDown}
          />
        </Input.Root>

        <Button.Root
          className="max-h-[38px] min-h-[38px] max-w-fit px-4"
          type="submit"
          disabled={isFetching || !hasInvites}
        >
          <Button.Content
            disabled={isFetching || !hasInvites}
            className="text-sm font-semibold"
          >
            Convidar
          </Button.Content>
        </Button.Root>
      </div>

      <span
        className={twMerge(
          'ml-[58px] text-xs text-green-600 opacity-0',
          fieldsErrors?.email && 'text-red-500',
          fieldsErrors?.email && 'opacity-100',
          inviteSent && 'animate-show-invite-message'
        )}
        onAnimationEnd={() => setInviteSent(false)}
      >
        {fieldsErrors?.email ? fieldsErrors?.email : 'Convite enviado'}
      </span>
    </form>
  )
}
