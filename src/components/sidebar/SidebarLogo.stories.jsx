import { SidebarLogo } from '@components'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Sidebar/SidebarLogo',
  component: SidebarLogo,
}

export const Default = {
  render: (props) => {
    return (
      <BrowserRouter>
        <SidebarLogo {...props} />
      </BrowserRouter>
    )
  },
}
