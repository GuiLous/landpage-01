import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { FileInput } from '@components'

describe('FileInput Component', () => {
  const setValueMock = jest.fn()

  it('should render correctly', () => {
    render(<FileInput files={[]} setFiles={() => {}} setValue={() => {}} />)

    expect(screen.getByText('Solte os arquivos aqui ou')).toBeInTheDocument()
    expect(screen.getByText('Arquivos suportados:')).toBeInTheDocument()
  })

  it('should update the files correctly when selecting a file', () => {
    const files = []

    render(<FileInput files={files} setValue={setValueMock} />)

    const file = new File(['conteúdo do arquivo'], 'arquivo.png', {
      type: 'image/png',
    })
    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { files: [file] } })

    expect(setValueMock).toHaveBeenCalledTimes(1)
    expect(setValueMock).toHaveBeenCalledWith('files', [file])
  })

  it('should upload the file correctly when dragging and dropping', () => {
    const files = []

    render(<FileInput files={files} setValue={setValueMock} />)

    const file = new File(['conteúdo do arquivo'], 'arquivo.png', {
      type: 'image/png',
    })
    const dropZone = screen.getByTestId('drop-zone')

    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } })

    expect(setValueMock).toHaveBeenCalledTimes(1)
    expect(setValueMock).toHaveBeenCalledWith('files', [file])
  })

  it('should limit the maximum number of files', () => {
    const files = [
      new File(['conteúdo do arquivo'], 'arquivo1.png', { type: 'image/png' }),
    ]

    render(<FileInput files={files} setValue={setValueMock} />)

    const additionalFiles = [
      new File(['conteúdo do arquivo'], 'arquivo2.png', { type: 'image/png' }),
      new File(['conteúdo do arquivo'], 'arquivo3.png', { type: 'image/png' }),
      new File(['conteúdo do arquivo'], 'arquivo4.png', { type: 'image/png' }),
      new File(['conteúdo do arquivo'], 'arquivo5.png', { type: 'image/png' }),
    ]

    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { files: additionalFiles } })

    expect(setValueMock).toHaveBeenCalledTimes(0)
  })

  it('should prevent the selection of invalid files', () => {
    const files = []

    render(<FileInput files={files} setValue={setValueMock} />)

    const invalidFile = new File(['conteúdo do arquivo'], 'arquivo.txt', {
      type: 'text/plain',
    })
    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { files: [invalidFile] } })

    expect(setValueMock).not.toHaveBeenCalled()
  })
})
