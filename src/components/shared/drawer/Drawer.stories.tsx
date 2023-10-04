import { Meta, StoryObj } from '@storybook/react'

import { Drawer } from './Drawer'

export default {
  title: 'Drawer/Drawer',
  component: Drawer,
  argTypes: {
    showOverlay: { control: 'boolean' },
  },
  args: {
    showOverlay: false,
  },
} as Meta

export const Default: StoryObj = {
  render: (props: any) => (
    <Drawer>
      <Drawer.Button asChild>
        <button className="rounded-[4px] bg-purple-400 px-2 py-1">Abrir</button>
      </Drawer.Button>
      <Drawer.Content showOverlay={props.showOverlay} title="Drawer">
        <div className="mt-4 text-white">Drawer</div>
      </Drawer.Content>
    </Drawer>
  ),
}
