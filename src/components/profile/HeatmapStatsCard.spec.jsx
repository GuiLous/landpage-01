import { render, screen } from '@testing-library/react'

import { HeatmapStatsCard } from '@components'

const props = {
  head_shots: 10,
  chest_shots: 30,
  other_shots: 60,
}

const renderComponent = () => {
  render(<HeatmapStatsCard {...props} />)
}

describe('HeatmapStatsCard Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('CABEÇA')).toBeInTheDocument()
    expect(screen.getByText('PEITO')).toBeInTheDocument()
    expect(screen.getByText('OUTROS')).toBeInTheDocument()
  })

  it('should render percentage correctly', () => {
    renderComponent()

    expect(screen.getByTestId('hs-percentage').textContent).toEqual('10%')
    expect(screen.getByTestId('body-percentage').textContent).toEqual('30%')
    expect(screen.getByTestId('other-percentage').textContent).toEqual('60%')
  })
})
