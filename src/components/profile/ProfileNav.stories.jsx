import { BrowserRouter } from 'react-router-dom'

import { ProfileNav } from '@components'

export default {
  title: 'Profile/ProfileNav',
  component: ProfileNav,
  argTypes: {
    userId: { table: { disable: true } },
  },
  args: {
    userId: 1,
  },
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <ProfileNav {...props} />
    </BrowserRouter>
  ),
}
