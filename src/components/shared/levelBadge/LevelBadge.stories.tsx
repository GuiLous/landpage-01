import { Meta } from '@storybook/react'

import { LevelBadge } from './LevelBadge'

export default {
  title: 'Level/LevelBadge',
  component: LevelBadge,
  argTypes: {
    level: { control: { type: 'range', min: 0, max: 30 } },
    fitParent: { control: 'boolean' },
    variant: {
      options: ['xs', 'sm', 'smd', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
  },
  args: {
    level: 0,
    fitParent: false,
    variant: 'md',
  },
} as Meta

export const Default = (props: any) => {
  return <LevelBadge {...props} />
}
