import { Meta } from '@storybook/react'

import { LevelBadge } from './LevelBadge'

export default {
  title: 'Level/LevelBadge',
  component: LevelBadge,
  argTypes: {
    level: { control: { type: 'range', min: 0, max: 50 } },
    fitParent: { control: 'boolean' },
    xs: { control: 'boolean' },
    sm: { control: 'boolean' },
    smd: { control: 'boolean' },
    md: { control: 'boolean' },
    lg: { control: 'boolean' },
    xl: { control: 'boolean' },
  },
  args: {
    level: 0,
    fitParent: false,
    xs: false,
    sm: false,
    smd: false,
    md: false,
    lg: false,
    xl: false,
  },
} as Meta

export const Default = (props: any) => {
  return <LevelBadge {...props} />
}
