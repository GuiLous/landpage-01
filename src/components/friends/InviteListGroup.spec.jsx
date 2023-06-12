import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { InviteListGroup } from '@components'
import AppReducer from '@slices/AppSlice'

describe('InviteListGroup Component', () => {
  const app = {
    toasts: [],
    friendListOpen: false,
  }

  const store = configureStore({
    reducer: {
      app: AppReducer,
    },
    preloadedState: { app },
  })

  it('should render title and count correctly', () => {
    let args = {
      title: 'Convites',
      items: [],
    }

    render(<InviteListGroup {...args} />)
    expect(screen.getByText('Convites (0)')).toBeInTheDocument()

    args.items.push({
      id: '2:1',
      from_player: {
        avatar: {
          medium:
            'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
        },
        status: 'online',
        username: `User 2`,
      },
    })

    render(
      <Provider store={store}>
        <InviteListGroup {...args} />
      </Provider>
    )
    expect(screen.getByText('Convites (01)')).toBeInTheDocument()
  })

  it('should not collapse', () => {
    let args = {
      title: 'Convites',
      items: [
        {
          id: '2:1',
          from_player: {
            avatar: {
              medium:
                'https://avatars.cloudflare.steamstatic.com/f7bbf6788b270061e4017e082691e3728a3eecc3_full.jpg',
            },
            status: 'online',
            username: `User 2`,
          },
        },
      ],
      collapse: false,
    }

    render(
      <Provider store={store}>
        <InviteListGroup {...args} />
      </Provider>
    )
    expect(screen.queryByTestId('arrow-collapse')).not.toBeInTheDocument()
  })

  it('should render closed', () => {
    let args = {
      title: 'Convites',
      items: [],
    }

    render(<InviteListGroup {...args} />)
    expect(screen.getByTestId('container')).not.toHaveClass('open')
  })

  it('should render open', () => {
    let args = {
      title: 'Convites',
      items: [],
      open: true,
    }

    render(<InviteListGroup {...args} />)
    expect(screen.getByTestId('container')).toHaveClass('open')
  })

  it('should render with header disabled', () => {
    let args = {
      title: 'Convites',
      items: [],
    }

    render(<InviteListGroup {...args} />)
    expect(screen.getByTestId('container')).not.toHaveClass('open')
    expect(screen.getByTestId('header')).toHaveClass('disabled')
  })

  it('should render unread', () => {
    let args = {
      title: 'Convites',
      items: [],
      open: true,
      unread: true,
    }

    render(<InviteListGroup {...args} />)
    expect(screen.getByTestId('container')).toHaveClass('unread')
  })
})
