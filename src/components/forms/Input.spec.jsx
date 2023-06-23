import { Input } from '@components'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Input component', () => {
  it('should render correctly', () => {
    render(<Input />)
  })

  it('should display the placeholder text', () => {
    const placeholder = 'Type something'
    render(<Input placeholder={placeholder} />)
    const inputElement = screen.getByPlaceholderText(placeholder)

    expect(inputElement).toBeInTheDocument()
  })

  it('should handle input change', () => {
    const placeholder = 'Type something'
    render(<Input placeholder={placeholder} />)
    const inputElement = screen.getByPlaceholderText('Type something')
    const inputValue = 'Example text'

    fireEvent.change(inputElement, { target: { value: inputValue } })

    expect(inputElement.value).toBe(inputValue)
  })

  it('should display the left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon" />} />)
    const leftIconElement = screen.getByTestId('left-icon')

    expect(leftIconElement).toBeInTheDocument()
  })
})
