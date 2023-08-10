import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

import { ProfileHeaderSocialButtons } from '@components'
import { ProfileDetailsProvider } from '@contexts'

const socials = {
  steam: '112415987456519643',
  twitch: 'coreano',
}

const renderComponent = (isUserLogged = false) => {
  const mockStore = configureStore()({})

  render(
    <BrowserRouter>
      <ProfileDetailsProvider>
        <Provider store={mockStore}>
          <ProfileHeaderSocialButtons
            socials={socials}
            isUserLogged={isUserLogged}
          />
        </Provider>
      </ProfileDetailsProvider>
    </BrowserRouter>
  )
}
describe('ProfileHeaderSocialButtons Component', () => {
  it('should render icons', () => {
    renderComponent()

    expect(screen.getByTestId('steam')).toBeInTheDocument()
    expect(screen.getByTestId('twitch')).toBeInTheDocument()
  })

  it('should render add social button', () => {
    renderComponent(true)

    expect(screen.getByText('+')).toBeInTheDocument()
  })
})
