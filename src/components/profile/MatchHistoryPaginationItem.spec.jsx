import { fireEvent, render, screen } from '@testing-library/react'

import { MatchHistoryPaginationItem } from '@components'

describe('MatchHistoryPaginationItem Component', () => {
  const handleClick = jest.fn()

  it('should render correctly', () => {
    render(<MatchHistoryPaginationItem content="1" />)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should call handleClick function when clicked', () => {
    render(
      <MatchHistoryPaginationItem content="1" onPageChange={handleClick} />
    )

    fireEvent.click(screen.getByText('1'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when isCurrent is true', () => {
    render(
      <MatchHistoryPaginationItem
        content="1"
        onPageChange={handleClick}
        isCurrent={true}
      />
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should not be disabled when isCurrent is false', () => {
    render(
      <MatchHistoryPaginationItem
        content="1"
        onPageChange={handleClick}
        isCurrent={false}
      />
    )

    expect(screen.getByRole('button')).toBeEnabled()
  })
})
