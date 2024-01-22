'use client'
import { useCallback, useEffect, useState } from 'react'
import Joyride, { CallBackProps } from 'react-joyride'

import { storageService } from '@/services'

type placement = 'center' | 'auto'

export function LobbyWizard() {
  const [showWizard, setShowWizard] = useState(false)

  const saveAlreadyVisitedLobbyOnStorage = useCallback(
    (state: CallBackProps) => {
      const { action, lifecycle } = state
      if (action === 'skip') {
        storageService.save('AlreadyVisitedLobby', true)
      }

      if (action === 'reset' && lifecycle === 'init') {
        storageService.save('AlreadyVisitedLobby', true)
      }
    },
    []
  )

  const steps = [
    {
      target: '#sidebar',
      content: `Vamos conhecer o menu?`,
      disableBeacon: true,
      floaterProps: {
        hideArrow: true,
      },
      placement: 'center' as placement,
    },
    {
      target: '#step01',
      content: `Se estiver perdido, clique aqui no nosso logotipo e você será levado diretamente para a tela inicial, o seu lobby.`,
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
      target: '#step02',
      content: `Clique aqui para ver seu perfil, seu histórico de partidas, inventário e configurar sua conta.`,
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
      content: `Esse botão muda de acordo com o estado da sua fila`,
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
      content: `Jogar é bem mais divertido com amigos! Adicione e gerencie seus amigos na sua lista de amigos.`,
      disableBeacon: true,
      floaterProps: {
        hideArrow: true,
      },
      styles: {
        options: {
          width: 430,
        },
      },
    },
    {
      target: '#step05',
      content: `Fique atento às suas notificações.`,
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
      target: '#step06',
      content: `Encontrou algum bug? Está com alguma dificuldade? Quer reportar um usuário? Abra um ticket que nosso suporte vai te atender o mais rápido possível!`,
      disableBeacon: true,
      floaterProps: {
        hideArrow: true,
      },
      styles: {
        options: {
          width: 500,
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
    const alreadyVisitedLobby = storageService.get('AlreadyVisitedLobby')

    if (alreadyVisitedLobby) return setShowWizard(false)

    setShowWizard(true)
  }, [])

  return (
    showWizard && (
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
        callback={(state) => saveAlreadyVisitedLobbyOnStorage(state)}
      />
    )
  )
}
