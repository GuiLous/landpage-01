import { FileCard } from '@components'
import { fireEvent, render, screen } from '@testing-library/react'

describe('FileCard Component', () => {
  const mockFile = {
    name: 'example.jpg',
    size: 1024,
    type: 'image/jpg',
  }

  const mockOnRemoveFiles = jest.fn()

  it('should render correctly', () => {
    render(<FileCard file={mockFile} onRemoveFiles={mockOnRemoveFiles} />)

    expect(screen.getByText('- Pronto')).toBeInTheDocument()
  })

  it('should display the correct image based on the file type', () => {
    render(<FileCard file={mockFile} onRemoveFiles={mockOnRemoveFiles} />)
    const imageElement = screen.getByAltText('jpg image')
    expect(imageElement.src).toContain('jpg_file.png')
  })

  it('should display the file name correctly', () => {
    render(<FileCard file={mockFile} onRemoveFiles={mockOnRemoveFiles} />)
    const fileNameElement = screen.getByText('example.jpg')
    expect(fileNameElement).toBeInTheDocument()
  })

  it('should display the file size correctly in kilobytes and megabytes', () => {
    render(<FileCard file={mockFile} onRemoveFiles={mockOnRemoveFiles} />)
    const fileSizeElement = screen.getByText('1.0 KB')
    expect(fileSizeElement).toBeInTheDocument()
  })

  it('should remove the file when the close icon is clicked', () => {
    render(<FileCard file={mockFile} onRemoveFiles={mockOnRemoveFiles} />)
    const closeIcon = screen.getByTestId('close')
    fireEvent.click(closeIcon)
    expect(mockOnRemoveFiles).toHaveBeenCalledWith('example.jpg')
  })
})
