import { fireEvent, render, screen } from '@testing-library/react'

import { MatchHistoryPaginationItem } from '@components'

const handleClick = jest.fn()

const renderComponent = (content = 1, isCurrent = false) => {
  render(
    <MatchHistoryPaginationItem
      content={content}
      onPageChange={handleClick}
      isCurrent={isCurrent}
    />
  )
}

describe('MatchHistoryPaginationItem Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should call handleClick function when clicked', () => {
    renderComponent()

    fireEvent.click(screen.getByText('1'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when isCurrent is true', () => {
    const isCurrent = true
    renderComponent('1', isCurrent)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should not be disabled when isCurrent is false', () => {
    renderComponent()

    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('should render ...', () => {
    const content = '...'
    renderComponent(content)

    expect(screen.getByText('...')).toBeInTheDocument()
  })
})
