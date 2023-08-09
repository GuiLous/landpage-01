import { render, screen } from '@testing-library/react'

import { AccountCard } from '@components'

describe('AccountCard Component', () => {
  it('should render with title', async () => {
    const title = 'Algum título'

    render(<AccountCard title={title} />)
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.queryByTestId('title').textContent).toBe(title)
  })

  it('should not render without title', () => {
    render(<AccountCard />)
    expect(screen.queryByTestId('title')).not.toBeInTheDocument()
  })

  it('should render with children', () => {
    const children = <p>Conteúdo</p>
    render(<AccountCard>{children}</AccountCard>)
    expect(screen.getByText('Conteúdo')).toBeInTheDocument()
  })
})
