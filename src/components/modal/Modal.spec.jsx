import { fireEvent, render, screen } from '@testing-library/react'

import { Modal } from '@components'

describe('Modal Component', () => {
  it('should open the modal when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={jest.fn()} title="Test Title" />)

    const modalTitle = screen.getByText('Test Title')
    expect(modalTitle).toBeInTheDocument()
  })

  it('should close the modal when the close button is clicked', () => {
    const mockOnClose = jest.fn()
    render(<Modal isOpen={true} onClose={mockOnClose} title="Test Title" />)

    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should render children when passed in', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Test Child</div>
      </Modal>
    )
    const childContent = screen.getByText('Test Child')
    expect(childContent).toBeInTheDocument()
  })

  it('should render the close button when showCloseButton is true', () => {
    render(<Modal isOpen={true} onClose={jest.fn()} showCloseButton={true} />)
    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()
  })

  it('should does not render the close button when showCloseButton is false', () => {
    render(<Modal isOpen={true} onClose={jest.fn()} showCloseButton={false} />)
    const closeButton = screen.queryByRole('button')
    expect(closeButton).not.toBeInTheDocument()
  })
})
