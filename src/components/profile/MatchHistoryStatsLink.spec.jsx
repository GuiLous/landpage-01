import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { MatchHistoryStatsLink } from '@components'

const match = {
  stats: {
    kda: '0/0/0',
    kdr: 2,
    head_accuracy: 20,
    adr: 33.33,
    firstkills: 4,
  },
  id: 0,
  score: '10:2',
  end_date: '2023-05-05T10:30:00',
  won: true,
  map_name: 'Auditório',
}

const renderComponent = () => {
  render(
    <BrowserRouter>
      <MatchHistoryStatsLink match={match} />
    </BrowserRouter>
  )
}

describe('MatchHistoryStatsLink Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('Auditório')).toBeInTheDocument()
  })

  it('should render kdr correctly', () => {
    renderComponent()

    expect(screen.getByTestId('kdr').textContent).toEqual('2')
  })

  it('should render hs percentage correctly', () => {
    renderComponent()

    expect(screen.getByTestId('head_accuracy').textContent).toEqual('20%')
  })

  it('should render adr correctly', () => {
    renderComponent()

    expect(screen.getByTestId('adr').textContent).toEqual('33.33')
  })

  it('should render score correctly', () => {
    renderComponent()

    expect(screen.getByTestId('score').textContent).toEqual('10:2')
  })

  it('should render firstkills correctly', () => {
    renderComponent()

    expect(screen.getByTestId('firstkills').textContent).toEqual('4')
  })

  it('should render arrow icon', () => {
    renderComponent()

    expect(screen.getByTestId('arrow')).toBeInTheDocument()
  })

  it('should render default map name when has no map_name', () => {
    match.map_name = null

    renderComponent()

    expect(screen.getByText('Nome do mapa')).toBeInTheDocument()
  })

  it('should render won class if won', () => {
    renderComponent()

    expect(screen.getByTestId('link')).toHaveClass('won')
  })

  it('should render defeated class if won is false', () => {
    match.won = false
    renderComponent()

    expect(screen.getByTestId('link')).toHaveClass('defeated')
  })
})
