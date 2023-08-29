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
  score: '10 - 2',
  start_date: '2023-05-05T10:20:00',
  end_date: '2023-05-05T10:30:00',
  won: true,
  map_name: 'Auditório',
  status: 'finished',
  map_url:
    'https://static.wikia.nocookie.net/gtawiki/images/e/e8/SisyphusTheater-GTAV-Thumbnail.png',
  game_type: 'competitive',
}

const renderComponent = (isLink = true) => {
  render(
    <BrowserRouter>
      <MatchHistoryStatsLink match={match} isLink={isLink} />
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

    expect(screen.getByTestId('score').textContent).toEqual('10 - 2')
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

  it('should not render won class if match status is running', () => {
    match.status = 'running'
    match.won = true
    renderComponent()

    expect(screen.queryByTestId('link')).not.toHaveClass('won')
  })

  it('should not render defeated class if match status is running', () => {
    match.status = 'running'
    match.won = false
    renderComponent()

    expect(screen.queryByTestId('link')).not.toHaveClass('defeated')
  })

  it('should render game type Ranqueada correctly', () => {
    match.game_type = 'competitive'
    renderComponent()

    expect(screen.getByText('Ranqueada')).toBeInTheDocument()
  })

  it('should render game type Personalizada correctly', () => {
    match.game_type = 'custom'
    renderComponent()

    expect(screen.getByText('Personalizada')).toBeInTheDocument()
  })

  it('should render map image', () => {
    renderComponent()

    expect(screen.getByAltText('map name')).toBeInTheDocument()
  })

  it('should render map duration', () => {
    match.status = 'finished'
    renderComponent()

    expect(screen.getByText('10m00s')).toBeInTheDocument()
  })

  it('should render - if match status is running', () => {
    match.status = 'running'
    renderComponent()

    expect(screen.getAllByText('-')).toHaveLength(5)
  })

  it('should render EM PARTIDA if status is running', () => {
    match.status = 'running'
    renderComponent()

    expect(screen.getByText('EM PARTIDA')).toBeInTheDocument()
  })

  it('should render VITÓRIA if status is not running and won is true', () => {
    match.status = 'finished'
    match.won = true

    renderComponent()

    expect(screen.getByText('VITÓRIA')).toBeInTheDocument()
  })

  it('should render DERROTA if status is not running and won is true', () => {
    match.status = 'finished'
    match.won = false

    renderComponent()

    expect(screen.getByText('DERROTA')).toBeInTheDocument()
  })

  it('should render date start if status is running', () => {
    match.status = 'running'

    renderComponent()

    expect(screen.getByText('05/05/2023 - 10m00s')).toBeInTheDocument()
  })

  it('should not render arrow icons if isLink is false', () => {
    match.status = 'running'

    const isLink = false
    renderComponent(isLink)

    expect(screen.queryByTestId('arrow')).not.toBeInTheDocument()
  })
})
