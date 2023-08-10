import { render, screen, waitFor } from '@testing-library/react'

import { Progress } from '@components'

describe('Progress Component', () => {
  it('should render correctly', async () => {
    render(<Progress value={50} initial={0} />)

    await screen.findByText('50', {}, { timeout: 2000 })
  })

  it('should render initial value', async () => {
    render(<Progress value={50} initial={24} />)

    await screen.findByText('24 pts')
  })

  it('should not render label if showLabel is false', async () => {
    render(<Progress value={50} initial={0} showLabel={false} />)

    await waitFor(
      () => expect(screen.queryByText('50')).not.toBeInTheDocument(),
      2000
    )
  })

  it('should render labelSuffix on change', async () => {
    render(<Progress value={50} initial={0} labelSuffix="teste" />)

    await screen.findAllByText('0 teste')
  })
})
