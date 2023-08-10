import { render, screen } from '@testing-library/react'

import { MatchHistoryPagination } from '@components'

const handleClick = jest.fn()

const renderComponent = (totalPages, currentPage) => {
  render(
    <MatchHistoryPagination
      onPageChange={handleClick}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}

describe('MatchHistoryPagination Component', () => {
  it('should render correctly', () => {
    const totalPages = 10
    const currentPage = 1
    renderComponent(totalPages, currentPage)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('should render 1 button if totalPages is 1', () => {
    const totalPages = 0
    const currentPage = 1
    renderComponent(totalPages, currentPage)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(1)
  })

  it('should render 4 buttons if totalPages is 10', () => {
    const totalPages = 10
    const currentPage = 1
    renderComponent(totalPages, currentPage)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(4)
  })

  it('should render 7 buttons if currentPage is 4', () => {
    const totalPages = 10
    const currentPage = 4
    renderComponent(totalPages, currentPage)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(7)
  })

  it('should render 4 buttons if currentPage is 10', () => {
    const totalPages = 10
    const currentPage = 10
    renderComponent(totalPages, currentPage)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(4)
  })

  it('should not render left arrow icon if currentPage is 1', () => {
    const totalPages = 10
    const currentPage = 1
    renderComponent(totalPages, currentPage)

    const leftIcon = screen.queryByTestId('previous-icon')
    expect(leftIcon).not.toBeInTheDocument()
  })

  it('should not render right arrow icon if currentPage is equal to last page', () => {
    const totalPages = 10
    const currentPage = 10
    renderComponent(totalPages, currentPage)

    const rightIcon = screen.queryByTestId('next-icon')
    expect(rightIcon).not.toBeInTheDocument()
  })

  it('should not render right and left arrow icon if currentPage is bigger than 1 and lower then last page', () => {
    const totalPages = 10
    const currentPage = 5
    renderComponent(totalPages, currentPage)

    const rightIcon = screen.queryByTestId('next-icon')
    const leftIcon = screen.queryByTestId('previous-icon')

    expect(leftIcon).toBeInTheDocument()
    expect(rightIcon).toBeInTheDocument()
  })
})
