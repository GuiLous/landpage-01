'use client'
import { useCallback, useEffect, useState } from 'react'
import Joyride, { CallBackProps } from 'react-joyride'

import { storageService } from '@/services'

type placement = 'center' | 'auto'

export function ProfileWizard() {
  const [showWizard, setShowWizard] = useState(false)

  const saveAlreadyVisitedProfileOnStorage = useCallback(
    (state: CallBackProps) => {
      const { action, lifecycle } = state
      if (action === 'skip') {
        storageService.save('AlreadyVisitedProfile', true)
      }

      if (action === 'reset' && lifecycle === 'init') {
        storageService.save('AlreadyVisitedProfile', true)
      }
    },
    []
  )

  const steps = [
    {
      target: '#header',
      content: `Vamos conhecer o seu perfil?`,
      disableBeacon: true,
      floaterProps: {
        hideArrow: true,
      },
      placement: 'center' as placement,
    },
    {
      target: '#step01',
      content: `Alterou sua foto de perfil na Steam? Clique aqui e sincronize seu avatar novamente.`,
      disableBeacon: true,
      floaterProps: {
        hideArrow: true,
      },
      styles: {
        options: {
          width: 400,
        },
      },
    },
    {
      target: '#step02',
      content: `Quer que os outros jogadores te encontrem nas redes sociais? Adicione suas contas aqui.`,
      disableBeacon: true,
      floaterProps: {
        hideArrow: true,
      },
      styles: {
        options: {
          width: 420,
        },
      },
    },
    {
      target: '#step03',
      content: `Veja e ative seus itens customizáveis no seu Inventário clicando aqui.`,
      disableBeacon: true,
      floaterProps: {
        hideArrow: true,
      },
      styles: {
        options: {
          width: 370,
        },
      },
    },
    {
      target: '#step04',
      content: `Personaliza seu perfil e faça alterações na sua conta clicando aqui.`,
      disableBeacon: true,
      floaterProps: {
        hideArrow: true,
      },
      styles: {
        options: {
          width: 370,
        },
      },
    },
    {
      target: 'div',
      content: `Pronto!`,
      disableBeacon: true,
      floaterProps: {
        hideArrow: true,
      },
      placement: 'center' as placement,
    },
  ]

  useEffect(() => {
    const alreadyVisitedProfile = storageService.get('AlreadyVisitedProfile')

    if (alreadyVisitedProfile) return setShowWizard(false)

    setShowWizard(true)
  }, [])

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
      callback={(state) => saveAlreadyVisitedProfileOnStorage(state)}
    />
  )
}
