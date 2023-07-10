import { render, screen } from '@testing-library/react'

import { SidebarMenuItem } from '@components'

describe('SidebarMenuItem Component', () => {
  const props = {
    receivedInvites: 0,
    unreadNotifications: 0,
    item: 'amigos',
  }

  it('should renders with amigos label correctly', async () => {
    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('amigos')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should renders with notificações label correctly', async () => {
    props.item = 'notificações'
    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('notificações')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should renders with sair label correctly', async () => {
    props.item = 'sair'
    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('sair')).toBeInTheDocument()
  })

  it('should renders friends badge correctly', async () => {
    props.item = 'amigos'
    props.receivedInvites = 2

    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('amigos')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should renders notifications badge correctly', async () => {
    props.item = 'notificações'
    props.unreadNotifications = 2

    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('notificações')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should renders em breve badge correctly', async () => {
    props.item = 'loja'

    render(<SidebarMenuItem {...props} />)

    expect(screen.getByText('loja')).toBeInTheDocument()
    expect(screen.getByText('Em breve')).toBeInTheDocument()
  })
})
