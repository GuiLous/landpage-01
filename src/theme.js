import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  components: {
    Button: {
      baseStyle: {
        bg: 'primary.400',
        backgroundColor: 'primary.400',
        textTransform: 'uppercase',
        fontWeight: 'normal',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 20,
        paddingRight: 20,
        _hover: {
          bg: 'primary.300',
          backgroundColor: 'primary.300',
          _disabled: {
            bg: 'primary.400',
            backgroundColor: 'primary.400',
          },
        },
      },
      variants: {
        secondary: {
          color: 'white',
          bg: 'transparent',
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: 'secondary.400',
          _hover: {
            bg: 'secondary.400',
            backgroundColor: 'secondary.400',
            color: 'primary.400',
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

    secondary: {
      400: '#00E4C9',
    },
  },
})
