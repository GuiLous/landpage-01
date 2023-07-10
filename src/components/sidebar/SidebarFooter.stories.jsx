
import { SidebarFooter } from '@components'

export default {
  title: 'Sidebar/SidebarFooter',
  component: SidebarFooter,
}

export const Default = {
  render: (props) => {
    return (
      <SidebarFooter {...props} />
    )
  },
}
