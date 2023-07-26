import { render, screen } from '@testing-library/react'

import { SidebarFooter } from '@components'

describe('SidebarFooter Component', () => {
  it('should render Instagram icon', async () => {
    render(<SidebarFooter />)
    const instagramIcon = screen.getByTestId('instagram-icon')

    expect(instagramIcon).toBeInTheDocument()
  })

  it('should render Twitter icon', () => {
    render(<SidebarFooter />)
    const twitterIcon = screen.getByTestId('twitter-icon')

    expect(twitterIcon).toBeInTheDocument()
  })

  it('should render Discord icon', () => {
    render(<SidebarFooter />)
    const discordIcon = screen.getByTestId('discord-icon')

    expect(discordIcon).toBeInTheDocument()
  })

  it('should render Youtube icon', () => {
    render(<SidebarFooter />)
    const youtubeIcon = screen.getByTestId('youtube-icon')

    expect(youtubeIcon).toBeInTheDocument()
  })

  it('should render Facebook icon', () => {
    render(<SidebarFooter />)
    const facebookIcon = screen.getByTestId('facebook-icon')

    expect(facebookIcon).toBeInTheDocument()
  })
})
