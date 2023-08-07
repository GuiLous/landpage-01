import { render, screen } from '@testing-library/react'

import { LoadingTexts } from '@components'

const renderComponent = (intervalTime = 3000) => {
  const textsArray = [`Ligando as luzes`, `test`]

  render(<LoadingTexts textsArray={textsArray} intervalTime={intervalTime} />)
}

describe('LoadingTexts Component', () => {
  it('should render correctly', async () => {
    renderComponent(1000)

    expect(screen.getByText('Ligando as luzes')).toBeInTheDocument()

    await screen.findByText('test', {}, { timeout: 1000 })
  })

  it('should respect interval to render correctly', async () => {
    renderComponent()

    expect(screen.getByText('Ligando as luzes')).toBeInTheDocument()
    expect(screen.queryByText('test')).not.toBeInTheDocument()

    await screen.findByText('test', {}, { timeout: 3000 })
  })
})
