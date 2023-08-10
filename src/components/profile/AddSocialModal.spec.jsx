import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ProfilesAPI } from '@api'
import { AddSocialModal } from '@components'
import { ProfileDetailsProvider } from '@contexts'
import UserReducer from '@slices/UserSlice'

jest.mock('@api', () => ({
  ProfilesAPI: {
    updateSocials: jest.fn(),
    detail: jest.fn(),
  },
}))

let socialsLinked = []

let socials = {
  steam: '112415987456519643',
  twitch: 'teste',
}

const renderComponent = () => {
  const user = {
    id: 1,
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
    preloadedState: { user },
  })

  render(
    <BrowserRouter>
      <ProfileDetailsProvider>
        <Provider store={store}>
          <AddSocialModal
            isOpen={true}
            onClose={jest.fn()}
            socialsLinked={socialsLinked}
            socials={socials}
          />
        </Provider>
      </ProfileDetailsProvider>
    </BrowserRouter>
  )
}

describe('AddSocialModal Component', () => {
  afterEach(() => {
    socialsLinked = []
  })

  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByText('SOCIAL LINKS')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Adicione o link de suas redes sociais que ficarão visíveis no seu perfil.'
      )
    ).toBeInTheDocument()
  })

  it('should render Vincular button', () => {
    renderComponent()

    expect(screen.getByTestId('add-twitch').textContent).toBe('Vincular')
    expect(screen.getByTestId('add-discord').textContent).toBe('Vincular')
    expect(screen.getByTestId('add-youtube').textContent).toBe('Vincular')
  })

  it('should render social name with delete button if social already linked', () => {
    socialsLinked.push('twitch')

    renderComponent()

    expect(screen.queryByTestId('add-twitch')).not.toBeInTheDocument()
    expect(screen.getByTestId('add-discord').textContent).toBe('Vincular')
    expect(screen.getByTestId('add-youtube').textContent).toBe('Vincular')

    expect(screen.getByText('twitch')).toBeInTheDocument()
    expect(screen.getByTestId('delete-twitch')).toBeInTheDocument()
  })

  it('should render input on click Vincular button', async () => {
    renderComponent()

    const linkBtn = screen.getByTestId('add-youtube')
    fireEvent.click(linkBtn)

    await screen.findByTestId('input-youtube')
    await screen.findByTestId('send-youtube')
    await screen.findByTestId('cancel-youtube')
  })

  it('should close input on click X icon', async () => {
    renderComponent()

    const linkBtn = screen.getByTestId('add-youtube')
    fireEvent.click(linkBtn)

    await screen.findByTestId('input-youtube')
    await screen.findByTestId('send-youtube')
    await screen.findByTestId('cancel-youtube')

    const cancelBtn = screen.getByTestId('cancel-youtube')
    fireEvent.click(cancelBtn)

    await screen.findByTestId('add-youtube')
  })

  it('should call handleSubmit on click Enviar', async () => {
    ProfilesAPI.updateSocials.mockResolvedValue({})
    ProfilesAPI.detail.mockResolvedValue({})

    renderComponent()

    const linkBtn = screen.getByTestId('add-youtube')
    fireEvent.click(linkBtn)

    await screen.findByTestId('input-youtube')

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')

    const sendBtn = screen.getByTestId('send-youtube')

    fireEvent.click(sendBtn)

    const payload = {
      social_handles: {
        steam: '112415987456519643',
        twitch: 'teste',
        youtube: 'test',
      },
    }

    await waitFor(() =>
      expect(ProfilesAPI.updateSocials).toHaveBeenCalledWith(null, payload)
    )
  })

  it('should call handleSubmit on press Enter', async () => {
    ProfilesAPI.updateSocials.mockResolvedValue({})
    ProfilesAPI.detail.mockResolvedValue({})

    renderComponent()

    const linkBtn = screen.getByTestId('add-youtube')
    fireEvent.click(linkBtn)

    await screen.findByTestId('input-youtube')

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    const payload = {
      social_handles: {
        steam: '112415987456519643',
        twitch: 'teste',
        youtube: 'test',
      },
    }

    await waitFor(() =>
      expect(ProfilesAPI.updateSocials).toHaveBeenCalledWith(null, payload)
    )
  })

  it('should call handleSubmit on click delete button', async () => {
    ProfilesAPI.updateSocials.mockResolvedValue({})
    ProfilesAPI.detail.mockResolvedValue({})

    socialsLinked.push('twitch')
    renderComponent()

    expect(screen.queryByTestId('add-twitch')).not.toBeInTheDocument()
    expect(screen.getByText('twitch')).toBeInTheDocument()

    const deleteBtn = screen.getByTestId('delete-twitch')
    fireEvent.click(deleteBtn)

    const payload = {
      social_handles: {
        steam: '112415987456519643',
      },
    }

    await waitFor(() =>
      expect(ProfilesAPI.updateSocials).toHaveBeenCalledWith(null, payload)
    )
  })
})
