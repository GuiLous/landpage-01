import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'
import { Provider } from 'react-redux'

import { ChangeEmailCard } from '@components'
import UserReducer from '@slices/UserSlice'

const fakeResponse = {
  email: 'userUpdate@example.com',
}

const server = setupServer(
  rest.patch(
    'http://localhost:8000/api/accounts/update-email/',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fakeResponse))
    }
  )
)

const renderComponent = () => {
  const user = {
    id: 1,
    email: 'email@example.com',
    account: {
      is_verified: false,
    },
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  return (
    <Provider store={store}>
      <ChangeEmailCard />
    </Provider>
  )
}

describe('ChangeEmailCard Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => server.close())

  it('should render correctly', () => {
    render(renderComponent())

    expect(screen.getByText('ALTERAR E-MAIL')).toBeInTheDocument()
    expect(screen.getByTestId('pencilIcon')).toBeInTheDocument()
  })

  it('should disable button if is not editing', () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('should enable editing when input group is clicked', () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.click(input)

    expect(input).toBeEnabled()
  })

  it('should update email when handleChange is called', () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')
  })

  it('should change icon to CheckCircleIcon if user.email is different of email, is not editing and email is valid', () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')
    expect(screen.getByTestId('checkCircleIcon1')).toBeInTheDocument()
  })

  it('should change icon to CheckCircleIcon if is editing and email is valid', () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')
    expect(screen.getByTestId('checkCircleIcon2')).toBeInTheDocument()
  })

  it('should change icon to WarningCircleIcon if user.email is different of email, is not editing and email is not valid', () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.' } })

    expect(input.value).toBe('test@example.')
    expect(screen.getByTestId('warningCircleIcon1')).toBeInTheDocument()
  })

  it('should change icon to WarningCircleIcon if is editing and email is not valid', () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.' } })

    expect(input.value).toBe('test@example.')
    expect(screen.getByTestId('warningCircleIcon2')).toBeInTheDocument()
  })

  it('should change email when press Enter, email is correct and email is different of current email', async () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(input.value).toBe('test@example.com')

    await waitFor(() =>
      expect(server.listHandlers()[0].info.path).toBe(
        'http://localhost:8000/api/accounts/update-email/'
      )
    )
  })

  it('should change email when clicked on save, email is correct and email is different of current email', async () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')

    const saveBtn = screen.getByTestId('saveBtn')
    saveBtn.click()

    await waitFor(() =>
      expect(server.listHandlers()[0].info.path).toBe(
        'http://localhost:8000/api/accounts/update-email/'
      )
    )
  })

  it('should disable button if email is equal of user.email', () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'email@example.com' } })

    expect(input.value).toBe('email@example.com')
    const saveBtn = screen.getByTestId('saveBtn')
    expect(saveBtn).toBeDisabled()
  })

  it('should disable button if email is invalid', () => {
    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'email@example.' } })

    expect(input.value).toBe('email@example.')
    const saveBtn = screen.getByTestId('saveBtn')
    expect(saveBtn).toBeDisabled()
  })

  it('should disable button if server return error with the email', async () => {
    server.use(
      rest.patch(
        'http://localhost:8000/api/accounts/update-email/',
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({ fieldsErrors: { email: 'Email já existe' } })
          )
        }
      )
    )

    render(renderComponent())

    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(input.value).toBe('test@example.com')

    const saveBtn = screen.getByTestId('saveBtn')
    saveBtn.click()

    await screen.findByText('Email já existe')
  })
})
