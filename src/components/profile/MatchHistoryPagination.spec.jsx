import { render, screen } from '@testing-library/react'

import { MatchHistoryPagination } from '@components'

describe('MatchHistoryPagination Component', () => {
  const handleClick = jest.fn()

  it('should render correctly', () => {
    render(
      <MatchHistoryPagination
        onPageChange={handleClick}
        totalPages={10}
        currentPage={1}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('should render 1 button if totalPages is 1', () => {
    render(
      <MatchHistoryPagination
        onPageChange={handleClick}
        totalPages={0}
        currentPage={1}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(1)
  })

  it('should render 4 buttons if totalPages is 10', () => {
    render(
      <MatchHistoryPagination
        onPageChange={handleClick}
        totalPages={10}
        currentPage={1}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(4)
  })

  it('should render 7 buttons if currentPage is 4', () => {
    render(
      <MatchHistoryPagination
        onPageChange={handleClick}
        totalPages={10}
        currentPage={4}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(7)
  })

  it('should render 4 buttons if currentPage is 10', () => {
    render(
      <MatchHistoryPagination
        onPageChange={handleClick}
        totalPages={10}
        currentPage={10}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(4)
  })

  it('should not render left arrow icon if currentPage is 1', () => {
    render(
      <MatchHistoryPagination
        onPageChange={handleClick}
        totalPages={10}
        currentPage={1}
      />
    )

    const leftIcon = screen.queryByTestId('previous-icon')
    expect(leftIcon).not.toBeInTheDocument()
  })

  it('should not render right arrow icon if currentPage is equal to last page', () => {
    render(
      <MatchHistoryPagination
        onPageChange={handleClick}
        totalPages={10}
        currentPage={10}
      />
    )

    const rightIcon = screen.queryByTestId('next-icon')
    expect(rightIcon).not.toBeInTheDocument()
  })

  it('should not render right and left arrow icon if currentPage is bigger than 1 and lower then last page', () => {
    render(
      <MatchHistoryPagination
        onPageChange={handleClick}
        totalPages={10}
        currentPage={5}
      />
    )

    const rightIcon = screen.queryByTestId('next-icon')
    const leftIcon = screen.queryByTestId('previous-icon')

    expect(leftIcon).toBeInTheDocument()
    expect(rightIcon).toBeInTheDocument()
  })
})
