import { render, screen } from '@testing-library/react'

import { LevelProgressBar } from '@components'

const progress = {
  earned_points: 0,
  level_points_before: 0,
  level_points_after: 0,
  level_before: 0,
  level_after: 0,
}

describe('LevelProgressBar Component', () => {
  it('should render correctly', () => {
    render(<LevelProgressBar {...progress} />)

    expect(screen.getByText('Level 0')).toBeInTheDocument()
    expect(screen.getByText('/100')).toBeInTheDocument()
  })

  it('should render user level', () => {
    progress.level_after = 4
    progress.level_before = 4

    render(<LevelProgressBar {...progress} />)
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('should render user points', () => {
    progress.level_points_after = 67
    progress.level_points_before = 67

    render(<LevelProgressBar {...progress} />)
    expect(screen.getByText('67')).toBeInTheDocument()
  })

  it('should be next level icon greater than current level icon in 1 level', () => {
    progress.level_points_before = 67
    progress.level_points_after = 67
    progress.level_before = 33
    progress.level_after = 33

    render(<LevelProgressBar {...progress} />)

    expect(screen.getByText('34')).toBeInTheDocument()
  })
})
