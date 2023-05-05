import { render, screen } from '@testing-library/react'

import { HeatmapCardStats } from '@components'

describe('HeatmapCardStats Component', () => {
  const profile = {
    stats: {
      head_shots: 10,
      chest_shots: 30,
      other_shots: 60,
    },
  }

  it('should renders correctly', () => {
    render(<HeatmapCardStats profile={profile} />)

    expect(screen.getByText('CABEÇA')).toBeInTheDocument()
    expect(screen.getByText('CORPO')).toBeInTheDocument()
    expect(screen.getByText('PERNAS')).toBeInTheDocument()
  })

  it('should render percentage correctly', () => {
    render(<HeatmapCardStats profile={profile} />)

    expect(screen.getByTestId('hs-percentage').textContent).toEqual('10.0%')
    expect(screen.getByTestId('body-percentage').textContent).toEqual('30.0%')
    expect(screen.getByTestId('other-percentage').textContent).toEqual('60.0%')
  })
})
