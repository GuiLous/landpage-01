import { useArgs } from '@storybook/preview-api'

import { MenuContext } from './MenuContext'

export default {
  title: 'MenuContext/MenuContext',
  component: MenuContext,
  argTypes: {
    open: { control: { type: 'boolean' } },
    alreadyInvited: { control: { type: 'boolean' } },
    alreadyOnTeam: { control: { type: 'boolean' } },
    isAvailable: { control: { type: 'boolean' } },
    steam_url: { control: { type: 'text' } },
    user_id: { control: { type: 'number' } },
    username: { control: { type: 'text' } },
  },
  args: {
    open: false,
    alreadyInvited: false,
    alreadyOnTeam: false,
    isAvailable: true,
    steam_url: '',
    user_id: 1,
    username: '',
  },
}

export const Default = (props: any) => {
  const [{ open }, updateArgs] = useArgs()
  const changeOpen = () => updateArgs({ open: !open })

  return (
    <MenuContext open={open} onOpenChange={changeOpen}>
      <MenuContext.Trigger>
        <button>open</button>
      </MenuContext.Trigger>

      <MenuContext.Content {...props} />
    </MenuContext>
  )
}
