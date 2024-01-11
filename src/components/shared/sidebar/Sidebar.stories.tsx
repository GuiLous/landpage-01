import { Sidebar } from './Sidebar'

export default {
  title: 'Sidebar/Sidebar',
  component: Sidebar,
}

export const Default = {
  render: (props: any) => {
    return <Sidebar {...props} />
  },
}
