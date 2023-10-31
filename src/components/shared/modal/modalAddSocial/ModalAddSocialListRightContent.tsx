'use client'

import { useState } from 'react'

import { hasUrlOnText } from '@/utils'

import { SocialHandles, useProfileDetails } from '@/contexts'

import { profilesApi } from '@/api'

import { Socials } from '@/components/shared/profileHeader/ProfileHeaderSocialButtons'

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
  const { setProfile } = useProfileDetails()

  const getAuth = useAuth()
  const auth = getAuth()

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

    setProfile(response)
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
