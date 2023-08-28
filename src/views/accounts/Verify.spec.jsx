import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { configureStore } from '@reduxjs/toolkit'
import { HttpService, StorageService } from '@services'
import UserReducer from '@slices/UserSlice'
import { VerifyView } from '@views'

const mockDispatch = jest.fn()

jest.mock('@services', () => ({
  HttpService: {
    post: jest.fn(),
  },
  StorageService: {
    set: jest.fn(),
    get: jest.fn(),
  },
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))

let user = {
  id: 1,
  email: 'user@example.com',
}

const renderComponent = () => {
  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  render(
    <BrowserRouter>
      <Provider store={store}>
        <VerifyView />
      </Provider>
    </BrowserRouter>
  )
}

describe('Verify View', () => {
  it('should render correctly', async () => {
    renderComponent()

    expect(screen.getByText('Verificação obrigatória')).toBeInTheDocument()
  })

  it('should update pin inputs when handleChange is called', () => {
    renderComponent()

    const input1 = screen.getByTestId('input1')
    const input2 = screen.getByTestId('input2')
    const input3 = screen.getByTestId('input3')
    const input4 = screen.getByTestId('input4')
    const input5 = screen.getByTestId('input5')
    const input6 = screen.getByTestId('input6')
    fireEvent.change(input1, { target: { value: '1' } })
    fireEvent.change(input2, { target: { value: '2' } })
    fireEvent.change(input3, { target: { value: '3' } })
    fireEvent.change(input4, { target: { value: '4' } })
    fireEvent.change(input5, { target: { value: '5' } })
    fireEvent.change(input6, { target: { value: '6' } })

    expect(input1.value).toBe('1')
    expect(input2.value).toBe('2')
    expect(input3.value).toBe('3')
    expect(input4.value).toBe('4')
    expect(input5.value).toBe('5')
    expect(input6.value).toBe('6')
  })

  it('should disable button if has no value', () => {
    renderComponent()

    const button = screen.getByTestId('sendButton')
    expect(button).toBeDisabled()
  })

  it('should disable button if value length is lower than 6', () => {
    renderComponent()

    const input1 = screen.getByTestId('input1')
    const input2 = screen.getByTestId('input2')
    const input3 = screen.getByTestId('input3')

    fireEvent.change(input1, { target: { value: '1' } })
    fireEvent.change(input2, { target: { value: '2' } })
    fireEvent.change(input3, { target: { value: '3' } })

    const button = screen.getByTestId('sendButton')
    expect(button).toBeDisabled()
  })

  it('should call HttpService.post on press Enter', async () => {
    HttpService.post.mockResolvedValue({})
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input1 = screen.getByTestId('input1')
    const input2 = screen.getByTestId('input2')
    const input3 = screen.getByTestId('input3')
    const input4 = screen.getByTestId('input4')
    const input5 = screen.getByTestId('input5')
    const input6 = screen.getByTestId('input6')
    fireEvent.change(input1, { target: { value: '1' } })
    fireEvent.change(input2, { target: { value: '2' } })
    fireEvent.change(input3, { target: { value: '3' } })
    fireEvent.change(input4, { target: { value: '4' } })
    fireEvent.change(input5, { target: { value: '5' } })
    fireEvent.change(input6, { target: { value: '6' } })

    fireEvent.keyDown(input6, { key: 'Enter', code: 'Enter' })

    await waitFor(() => expect(HttpService.post).toHaveBeenCalled())
  })

  it('should call HttpService.post on click button', async () => {
    HttpService.post.mockResolvedValue({})
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input1 = screen.getByTestId('input1')
    const input2 = screen.getByTestId('input2')
    const input3 = screen.getByTestId('input3')
    const input4 = screen.getByTestId('input4')
    const input5 = screen.getByTestId('input5')
    const input6 = screen.getByTestId('input6')
    fireEvent.change(input1, { target: { value: '1' } })
    fireEvent.change(input2, { target: { value: '2' } })
    fireEvent.change(input3, { target: { value: '3' } })
    fireEvent.change(input4, { target: { value: '4' } })
    fireEvent.change(input5, { target: { value: '5' } })
    fireEvent.change(input6, { target: { value: '6' } })

    const sendBtn = screen.getByTestId('sendButton')

    fireEvent.click(sendBtn)

    await waitFor(() => expect(HttpService.post).toHaveBeenCalled())
  })

  it('should not call HttpService.post if value length is lower than 6', async () => {
    HttpService.post.mockResolvedValue({})
    StorageService.get.mockResolvedValue('token')

    renderComponent()

    const input1 = screen.getByTestId('input1')
    const input2 = screen.getByTestId('input2')
    const input3 = screen.getByTestId('input3')
    const input4 = screen.getByTestId('input4')
    const input5 = screen.getByTestId('input5')
    fireEvent.change(input1, { target: { value: '1' } })
    fireEvent.change(input2, { target: { value: '2' } })
    fireEvent.change(input3, { target: { value: '3' } })
    fireEvent.change(input4, { target: { value: '4' } })
    fireEvent.change(input5, { target: { value: '5' } })

    const sendBtn = screen.getByTestId('sendButton')

    fireEvent.click(sendBtn)

    await waitFor(() => expect(HttpService.post).not.toHaveBeenCalled())
  })
})
