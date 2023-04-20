import { render, screen } from '@testing-library/react'

import { LevelProgressBar } from '@components'

describe('LevelProgressBar Component', () => {
  it('should renders correctly', () => {
    const earned_points = 0
    const level_points = 0
    const level = 0

    render(
      <LevelProgressBar
        earned_points={earned_points}
        level_points={level_points}
        level={level}
      />
    )

    expect(screen.getByText('+0')).toBeInTheDocument()
    expect(screen.getByText('CLASSIFICAÇÃO RANQUEADA')).toBeInTheDocument()
  })

  it('should render user level', () => {
    const earned_points = 0
    const level_points = 0
    const level = 4

    render(
      <LevelProgressBar
        earned_points={earned_points}
        level_points={level_points}
        level={level}
      />
    )

    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('should render user points', () => {
    const earned_points = 0
    const level_points = 67
    const level = 0

    render(
      <LevelProgressBar
        earned_points={earned_points}
        level_points={level_points}
        level={level}
      />
    )

    expect(screen.getByText('67')).toBeInTheDocument()
  })

  it('should be next level icon greater than current level icon in 1 level', () => {
    const earned_points = 0
    const level_points = 0
    const level = 33

    render(
      <LevelProgressBar
        earned_points={earned_points}
        level_points={level_points}
        level={level}
      />
    )

    expect(screen.getByText('34')).toBeInTheDocument()
  })
})
