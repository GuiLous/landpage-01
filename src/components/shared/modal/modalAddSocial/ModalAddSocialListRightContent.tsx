'use client'

import { useState } from 'react'

import { hasUrlOnText, revalidate } from '@/utils'

import { SocialHandles } from '@/functions'

import { profilesApi } from '@/modelsApi'

import { Socials } from '@/components/shared/profile/profileHeader/ProfileHeaderSocialButtons'

import { useAuth, useShowErrorToast } from '@/hooks'

import { ModalAddSocialAddButton } from './ModalAddSocialAddButton'
import { ModalAddSocialDeleteButton } from './ModalAddSocialDeleteButton'
import { ModalAddSocialInput } from './ModalAddSocialInput'
import { SocialHashType } from './ModalAddSocialList'

interface ModalAddSocialListRightContentProps {
  item: SocialHashType
  socialsLinked: Socials[]
  socials: SocialHandles
}

export function ModalAddSocialListRightContent({
  item,
  socialsLinked,
  socials,
}: ModalAddSocialListRightContentProps) {
  const auth = useAuth()

  const showErrorToast = useShowErrorToast()

  const [socialName, setSocialName] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [activeSocialItem, setActiveSocialItem] = useState('')

  const isLoading = item === activeSocialItem && isFetching
  const isEditing = item === activeSocialItem && !isFetching

  const handleChangeActiveSocialName = (item: SocialHashType) => {
    setSocialName('')
    setActiveSocialItem(item)
  }

  const handleUpdateSocials = (item: SocialHashType) =>
    handleSubmit('update', item)

  const handleDeleteSocials = (item: SocialHashType) => {
    handleSubmit('delete', item)
  }

  const handleSubmit = async (
    action: 'update' | 'delete',
    item: SocialHashType
  ) => {
    if (hasUrlOnText(socialName) || !auth?.token) return

    if (action === 'update' && socialName === '') return

    setIsFetching(true)

    const payload = {
      social_handles: {
        ...socials,
      },
    }

    payload.social_handles[item] = action === 'update' ? socialName : null

    const response = await profilesApi.updateSocials(auth.token, payload)

    if (response.errorMsg) {
      showErrorToast(response.errorMsg)

      setIsFetching(false)
      return
    }

    revalidate('profile')
    setIsFetching(false)
    setActiveSocialItem('')
    setSocialName('')
  }

  if (isEditing) {
    return (
      <ModalAddSocialInput
        handleUpdateSocials={handleUpdateSocials}
        item={item}
        setActiveSocialItem={setActiveSocialItem}
        setSocialName={setSocialName}
        socialName={socialName}
      />
    )
  }

  if (socialsLinked.includes(item)) {
    return (
      <ModalAddSocialDeleteButton
        handleDeleteSocials={handleDeleteSocials}
        item={item}
        socials={socials}
      />
    )
  }

  return (
    <ModalAddSocialAddButton
      handleChangeActiveSocialName={handleChangeActiveSocialName}
      isFetching={isFetching}
      isLoading={isLoading}
      item={item}
    />
  )
}
