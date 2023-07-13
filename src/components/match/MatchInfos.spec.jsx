import { render, screen } from '@testing-library/react'

import { MatchInfos } from '@components'

describe('MatchInfos Component', () => {
  const match = {
    start_date: '2023-07-13T00:00:00',
    end_date: '2023-07-13T01:00:00',
    game_type: 'competitive',
    game_mode: 1,
  }

  it('should render correctly', () => {
    render(<MatchInfos match={match} />)
    expect(screen.getByText('Ranked 1x1')).toBeInTheDocument()
    expect(screen.getByText('7/13/2023 00:00')).toBeInTheDocument()
    expect(screen.getByText('7/13/2023 01:00')).toBeInTheDocument()
  })

  it('should render Ranked 1x1', () => {
    match.game_mode = 1
    render(<MatchInfos match={match} />)
    expect(screen.getByText('Ranked 1x1')).toBeInTheDocument()
  })

  it('should render Ranked 5x5', () => {
    match.game_mode = 5
    render(<MatchInfos match={match} />)
    expect(screen.getByText('Ranked 5x5')).toBeInTheDocument()
  })

  it('should render Ranked 20x20', () => {
    match.game_mode = 20
    render(<MatchInfos match={match} />)
    expect(screen.getByText('Ranked 20x20')).toBeInTheDocument()
  })

  it('should render time left correctly', () => {
    render(<MatchInfos match={match} />)
    expect(screen.getByText('60:00')).toBeInTheDocument()
  })

  it('should render - when has no start_date', () => {
    match.start_date = null
    render(<MatchInfos match={match} />)
    expect(screen.getAllByText('-')).toHaveLength(2)
  })
})
