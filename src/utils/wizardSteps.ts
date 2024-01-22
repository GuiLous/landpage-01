import { Step } from 'react-joyride'

const profileSteps: Step[] = [
  {
    target: '#step-header',
    content: `Vamos conhecer o seu perfil?`,
    disableBeacon: true,
    floaterProps: {
      hideArrow: true,
    },
    placement: 'center',
  },
  {
    target: '#step-header01',
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
    target: '#step-header02',
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
    target: '#step-header03',
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
    target: '#step-header04',
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
    placement: 'center',
  },
]

const lobbySteps: Step[] = [
  {
    target: '#sidebar',
    content: `Vamos conhecer o menu?`,
    disableBeacon: true,
    floaterProps: {
      hideArrow: true,
    },
    placement: 'center',
  },
  {
    target: '#step-sidebar01',
    content: `Se estiver perdido, clique aqui no nosso logotipo e você será levado diretamente para a tela inicial, o seu lobby.`,
    disableBeacon: true,
    floaterProps: {
      hideArrow: true,
    },
    styles: {
      options: {
        width: 450,
      },
    },
  },
  {
    target: '#step-sidebar02',
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
    target: '#step-sidebar03',
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
    target: '#step-sidebar04',
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
    target: '#step-sidebar05',
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
    target: '#step-sidebar06',
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
    placement: 'center',
  },
]

export { lobbySteps, profileSteps }
