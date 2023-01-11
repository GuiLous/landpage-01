import { ChakraProvider } from '@chakra-ui/react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from '@store'
import App from './App'
import './index.css'

const Application = render(
  <ChakraProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ChakraProvider>
)

test('sample test', () => {
  expect(true).toBeTruthy()
})

// test('renders learn react link', () => {
// 	const linkElement = screen.getByText(/learn react/i)
// 	expect(linkElement).toBeInTheDocument()
// })

// test('renders logo', () => {
// 	const logo = screen.getByRole('img')
// 	expect(logo).toHaveAttribute('src', '/logo512.png')
// 	expect(logo).toHaveAttribute('alt', 'Killshot')
// })
