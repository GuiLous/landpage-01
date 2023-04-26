import { render, screen } from '@testing-library/react'

import { MatchHistoryStatsAccordion } from '@components'

describe('MatchHistoryStatsAccordion Component', () => {
  it('should renders correctly', () => {
    render(<MatchHistoryStatsAccordion />)

    expect(screen.getByText('Derrota')).toBeInTheDocument()
    expect(screen.getByText('san andreas')).toBeInTheDocument()
  })

  it('should renders with text Vitória when win prop is true', () => {
    render(<MatchHistoryStatsAccordion win={true} />)

    expect(screen.getByText('Vitória')).toBeInTheDocument()
  })

  it('should renders with text Derrota when win prop is false', () => {
    render(<MatchHistoryStatsAccordion />)

    expect(screen.getByText('Derrota')).toBeInTheDocument()
  })
})
