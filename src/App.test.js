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
