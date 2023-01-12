import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  components: {
    Button: {
      baseStyle: {
        bg: 'primary.400',
        backgroundColor: 'primary.400',
        textTransform: 'uppercase',
        fontWeight: 'normal',
        _hover: {
          bg: 'primary.300',
          backgroundColor: 'primary.300',
          _disabled: {
            bg: 'primary.400',
            backgroundColor: 'primary.400',
          },
        },
      },
      sizes: {
        lg: {
          fontSize: '32px',
        },
        md: {
          fontSize: '16px',
        },
      },
    },
  },
  colors: {
    primary: {
      300: '#34218C',
      400: '#6847FF',
    },
  },
})
