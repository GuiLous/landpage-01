import { LineupPlayerCardCloseBtn } from './LineupPlayerCardCloseBtn'

export default {
  title: 'Lineup/LineupPlayerCardCloseBtn',
  component: LineupPlayerCardCloseBtn,
  argTypes: {
    closeLabel: { control: 'text' },
  },
  args: {
    closeLabel: 'Fechar',
  },
}

export const Default = (props: any) => {
  return <LineupPlayerCardCloseBtn onClose={() => console.log('')} {...props} />
}
