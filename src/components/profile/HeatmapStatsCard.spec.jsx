import { render, screen } from '@testing-library/react'

import { HeatmapStatsCard } from '@components'

describe('HeatmapStatsCard Component', () => {
  const head_shots = 10
  const chest_shots = 30
  const other_shots = 60

  it('should render correctly', () => {
    render(
      <HeatmapStatsCard
        head_shots={head_shots}
        chest_shots={chest_shots}
        other_shots={other_shots}
      />
    )

    expect(screen.getByText('CABEÇA')).toBeInTheDocument()
    expect(screen.getByText('PEITO')).toBeInTheDocument()
    expect(screen.getByText('OUTROS')).toBeInTheDocument()
  })

  it('should render percentage correctly', () => {
    render(
      <HeatmapStatsCard
        head_shots={head_shots}
        chest_shots={chest_shots}
        other_shots={other_shots}
      />
    )

    expect(screen.getByTestId('hs-percentage').textContent).toEqual('10.0%')
    expect(screen.getByTestId('body-percentage').textContent).toEqual('30.0%')
    expect(screen.getByTestId('other-percentage').textContent).toEqual('60.0%')
  })
})
