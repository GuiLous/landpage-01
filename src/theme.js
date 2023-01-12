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
        _active: {
          bg: 'primary.500',
          backgroundColor: 'primary.500',
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
          _active: {
            bg: 'secondary.500',
            backgroundColor: 'secondary.500',
            borderColor: 'secondary.500',
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
    Link: {
      baseStyle: {
        color: '#999999',
        _hover: {
          color: 'secondary.400',
          textDecoration: 'none',
        },
        _active: {
          color: 'secondary.500',
        },
      },
    },
  },
  colors: {
    primary: {
      300: '#34218C',
      400: '#6847FF',
      500: '#1A1240',
    },

    secondary: {
      400: '#00E4C9',
      500: '#00A1A1',
    },
  },
})
