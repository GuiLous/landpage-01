import { render, screen } from '@testing-library/react'

import { ProfileCard } from '@components'

describe('ProfileCard Component', () => {
  it('should render with title', async () => {
    const title = 'Algum título'

    render(<ProfileCard title={title} />)
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.queryByTestId('title').textContent).toBe(title)
  })

  it('should render without title', () => {
    render(<ProfileCard />)
    expect(screen.queryByTestId('title')).not.toBeInTheDocument()
  })

  it('should render with children', () => {
    const children = <p>Conteúdo</p>
    render(<ProfileCard>{children}</ProfileCard>)
    expect(screen.getByText('Conteúdo')).toBeInTheDocument()
  })
})
