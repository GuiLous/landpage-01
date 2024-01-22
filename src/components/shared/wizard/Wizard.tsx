'use client'
import { useCallback, useEffect, useState } from 'react'
import Joyride, { CallBackProps, Step } from 'react-joyride'

import { storageService } from '@/services'

interface WizardsProps {
  steps: Step[]
  page: 'lobby' | 'profile'
}

export function Wizard({ steps, page }: WizardsProps) {
  const [showWizard, setShowWizard] = useState(false)

  const getStorageKey = useCallback(() => {
    if (page === 'lobby') return 'AlreadyVisitedLobby'
    if (page === 'profile') return 'AlreadyVisitedProfile'

    return ''
  }, [page])

  const saveAlreadyVisitedOnStorage = useCallback(
    (state: CallBackProps) => {
      const { action, lifecycle } = state
      if (action === 'skip') {
        storageService.save(getStorageKey(), true)
      }

      if (action === 'reset' && lifecycle === 'init') {
        storageService.save(getStorageKey(), true)
      }
    },
    [getStorageKey]
  )

  useEffect(() => {
    const alreadyVisited = storageService.get(getStorageKey())

    if (alreadyVisited) return setShowWizard(false)

    setShowWizard(true)
  }, [getStorageKey])

  return (
    <Joyride
      run={showWizard}
      steps={steps}
      continuous
      disableOverlayClose
      disableCloseOnEsc
      hideCloseButton
      showSkipButton
      styles={{
        options: { backgroundColor: '#1B1B1B' },
        buttonNext: { backgroundColor: '#6847FF', fontSize: 14 },
        buttonSkip: { color: 'white' },
        buttonBack: { color: 'white' },
        overlay: { background: 'rgb(0 0 0 /.85)' },
        tooltipTitle: { color: 'white' },
        tooltipContent: { color: 'white' },
      }}
      locale={{
        skip: 'Pular',
        next: 'Próximo',
        back: 'Anterior',
        last: 'Entendi!',
      }}
      callback={(state) => saveAlreadyVisitedOnStorage(state)}
    />
  )
}
