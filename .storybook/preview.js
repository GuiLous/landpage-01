/** @type { import('@storybook/react').Preview } */
import { ChakraProvider } from '@chakra-ui/react'
import { themes } from '@storybook/theming'
import theme from '../src/theme'

const preview = {
  parameters: {
    chakra: {
      theme,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    decorators: [
      (Story) => (
        <ChakraProvider theme={theme}>
          <Story />
        </ChakraProvider>
      ),
    ],
    docs: {
      theme: themes.dark,
    },
  },
}

export default preview
