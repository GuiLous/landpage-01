import { fireEvent, render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'

import { Select } from '@components'

const renderComponent = () => {
  const Wrapper = () => {
    const { control } = useForm()

    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ]

    return <Select control={control} options={options} />
  }

  render(<Wrapper />)
}

describe('Select Component', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('Assunto')).toBeInTheDocument()
  })

  it('should handle option change', async () => {
    renderComponent()

    fireEvent.mouseDown(screen.getByRole('combobox'))

    const option = await screen.findByText('Option 2')
    fireEvent.click(option)

    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })
})
