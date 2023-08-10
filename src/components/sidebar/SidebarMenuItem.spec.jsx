import { fireEvent, render, screen } from '@testing-library/react'

import { SidebarMenuItem } from '@components'

const props = {
  receivedInvites: 0,
  unreadNotifications: 0,
  item: 'amigos',
}

describe('SidebarMenuItem Component', () => {
  it('should render with amigos label correctly', async () => {
    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('amigos')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should render with notificações label correctly', async () => {
    props.item = 'notificações'
    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('notificações')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should render with sair label correctly', async () => {
    props.item = 'sair'
    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('sair')).toBeInTheDocument()
  })

  it('should render friends badge correctly', async () => {
    props.item = 'amigos'
    props.receivedInvites = 2

    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('amigos')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should render notifications badge correctly', async () => {
    props.item = 'notificações'
    props.unreadNotifications = 2

    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('notificações')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should render em breve badge correctly', async () => {
    props.item = 'loja'

    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('loja')).toBeInTheDocument()
    expect(screen.getByText('Em breve')).toBeInTheDocument()
  })

  it('should call onClickFunction', async () => {
    const onClickMock = jest.fn()
    props.item = 'amigos'

    render(<SidebarMenuItem {...props} onClickFunction={onClickMock} />)

    const button = screen.getByTestId('amigos')

    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalled()
  })
})
