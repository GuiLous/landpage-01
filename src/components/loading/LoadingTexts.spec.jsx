import { render, screen } from '@testing-library/react'

import { LoadingTexts } from '@components'

describe('LoadingTexts Component', () => {
  const textsArray = [`Ligando as luzes`]
  const intervalTime = 3000

  it('should render correctly', async () => {
    render(<LoadingTexts textsArray={textsArray} intervalTime={intervalTime} />)

    expect(screen.getByText('Ligando as luzes')).toBeInTheDocument()
  })
})
