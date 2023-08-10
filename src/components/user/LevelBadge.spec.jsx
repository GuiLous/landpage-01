import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { image1 } from '@assets/images/level_badges/badge_0-9.png'
import { LevelBadge } from '@components'

const props = {
  level: 5,
}

describe('LevelBadge Component', () => {
  it('loads and displays text based on props', async () => {
    render(<LevelBadge {...props} />)
    const badgeLevel = await screen.findByTestId('badge-level')
    expect(badgeLevel.textContent).toBe(props.level.toString())
  })

  it('loads and displays image based on props', async () => {
    render(<LevelBadge {...props} />)
    const badgeImage = await screen.findByTestId('badge-image')
    expect(badgeImage).toHaveAttribute('alt', `Level ${props.level}`)
    expect(badgeImage).toHaveAttribute('src', image1)
  })
})
