import { render, screen } from '@testing-library/react'

import { NotificationListItem } from '@components'

describe('NotificationListItem Component', () => {
  const props = {
    content: 'Nova notificação',
    avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    read_date: null,
    create_date: new Date().toISOString(),
  }

  it('should render correctly', () => {
    render(<NotificationListItem {...props} />)

    expect(screen.getByText(props.content)).toBeInTheDocument()
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
  })

  it('should render with class unread when not has read_date', () => {
    render(<NotificationListItem {...props} />)

    expect(screen.getByTestId('notification')).toHaveClass('unread')
  })

  it('should not renders with class unread when has read_date', () => {
    props.read_date = new Date().toISOString()
    render(<NotificationListItem {...props} />)

    expect(screen.getByTestId('notification')).not.toHaveClass('unread')
  })
})
