import { AccountCard } from '@components'

export default {
  title: 'Account/AccountCard',
  component: AccountCard,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: 'Título do card',
    description:
      'Receba notícias e atualizações da Reload. Isso pode incluir ofertas especiais, convites para betas e notícias relacionadas à empresa.',
  },
}

export const Default = {
  render: (props) => <AccountCard {...props} />,
}
