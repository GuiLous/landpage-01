import { BrowserRouter } from 'react-router-dom'

import { SidebarFooter } from '@components'

export default {
  title: 'Sidebar/SidebarFooter',
  component: SidebarFooter,
}

export const Default = {
  render: (props) => {
    return (
      <BrowserRouter>
        <SidebarFooter {...props} />
      </BrowserRouter>
    )
  },
}
