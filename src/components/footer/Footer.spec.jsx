import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { Footer } from '@components'

const renderComponent = () => {
  return (
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  )
}

describe('Footer Component', () => {
  it('should render desktop correctly', () => {
    render(renderComponent())

    expect(
      screen.getAllByText('Copyright ©2023. Todos os direitos reservados.')
    ).toHaveLength(2)
    expect(
      screen.getAllByText('Copyright ©2023. Todos os direitos reservados.')[0]
    ).toBeInTheDocument()

    expect(screen.getByTestId('logo')).toBeInTheDocument()

    expect(screen.getByTestId('instagram')).toHaveAttribute(
      'href',
      'https://www.instagram.com/reloadclubgg/'
    )

    expect(screen.getByTestId('twitter')).toHaveAttribute(
      'href',
      'https://twitter.com/reloadclubgg'
    )

    expect(screen.getByTestId('discord')).toHaveAttribute(
      'href',
      'https://discord.gg/mMMKshktfT'
    )

    expect(screen.getByTestId('youtube')).toHaveAttribute(
      'href',
      'https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A'
    )

    expect(screen.getByTestId('facebook')).toHaveAttribute(
      'href',
      'https://www.facebook.com/profile.php?id=100089787770305'
    )
  })

  it('should render mobile correctly', () => {
    render(renderComponent())

    window.innerWidth = 320
    window.dispatchEvent(new Event('resize'))

    const logoMobileElement = screen.getByTestId('logoMobile')
    expect(logoMobileElement).toBeInTheDocument()

    expect(screen.getByTestId('instagramMobile')).toHaveAttribute(
      'href',
      'https://www.instagram.com/reloadclubgg/'
    )

    expect(screen.getByTestId('twitterMobile')).toHaveAttribute(
      'href',
      'https://twitter.com/reloadclubgg'
    )

    expect(screen.getByTestId('discordMobile')).toHaveAttribute(
      'href',
      'https://discord.gg/mMMKshktfT'
    )

    expect(screen.getByTestId('youtubeMobile')).toHaveAttribute(
      'href',
      'https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A'
    )

    expect(screen.getByTestId('facebookMobile')).toHaveAttribute(
      'href',
      'https://www.facebook.com/profile.php?id=100089787770305'
    )
  })
})
