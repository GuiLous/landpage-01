import { render, screen } from '@testing-library/react'

import Notifications from './Notifications'

describe('Notifications Component', () => {
  it('should renders correctly', () => {
    render(<Notifications totalNotifications={1} />)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should not renders badge notification if totalNotifications props equal 0', () => {
    render(<Notifications totalNotifications={0} />)

    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})
