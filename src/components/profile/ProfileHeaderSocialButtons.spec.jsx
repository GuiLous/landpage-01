import { render, screen } from '@testing-library/react'

import { ProfileHeaderSocialButtons } from '@components'

const socials = [
  {
    name: 'steam',
    url: 'https://steamcommunity.com/profiles/76561199086242260/',
  },
  { name: 'discord', url: 'https://discord.gg/mMMKshktfT' },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/channel/UC0Yx6OapSWC0pym9ACd-D1A',
  },
]

describe('ProfileHeaderButtons Component', () => {
  it('should render icons', () => {
    render(<ProfileHeaderSocialButtons socials={socials} />)

    expect(screen.getByTestId('steam')).toBeInTheDocument()
    expect(screen.getByTestId('discord')).toBeInTheDocument()
    expect(screen.getByTestId('youtube')).toBeInTheDocument()
  })
})
