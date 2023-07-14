import { render, screen } from '@testing-library/react'

import { LevelProgressBar } from '@components'

describe('LevelProgressBar Component', () => {
  it('should render correctly', () => {
    const progress = {
      earned_points: 0,
      level_points_before: 0,
      level_points_after: 0,
      level_before: 0,
      level_after: 0,
    }

    render(<LevelProgressBar {...progress} />)
    expect(screen.getByText('Classificação Ranqueada')).toBeInTheDocument()
    expect(screen.getByText('/100')).toBeInTheDocument()
  })

  it('should render user level', () => {
    const progress = {
      earned_points: 0,
      level_points_before: 0,
      level_points_after: 0,
      level_before: 4,
      level_after: 4,
    }

    render(<LevelProgressBar {...progress} />)
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('should render user points', () => {
    const progress = {
      earned_points: 0,
      level_points_before: 67,
      level_points_after: 67,
      level_before: 0,
      level_after: 0,
    }

    render(<LevelProgressBar {...progress} />)
    expect(screen.getByText('67')).toBeInTheDocument()
  })

  it('should be next level icon greater than current level icon in 1 level', () => {
    const progress = {
      earned_points: 0,
      level_points_before: 67,
      level_points_after: 67,
      level_before: 33,
      level_after: 33,
    }

    render(<LevelProgressBar {...progress} />)

    expect(screen.getByText('34')).toBeInTheDocument()
  })
})
