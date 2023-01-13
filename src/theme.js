import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  components: {
    Button: {
      baseStyle: {
        bg: 'primary.400',
        backgroundColor: 'primary.400',
        textTransform: 'uppercase',
        fontWeight: 'normal',
        minHeight: '44px',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 8,
        _hover: {
          bg: 'primary.500',
          backgroundColor: 'primary.500',
          _disabled: {
            bg: 'primary.400',
            backgroundColor: 'primary.400',
          },
        },
        _active: {
          bg: 'primary.600',
          backgroundColor: 'primary.600',
        },
      },
      variants: {
        secondary: {
          color: 'white',
          bg: 'transparent',
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: 'secondary.400',
          paddingLeft: 0,
          paddingRight: 0,
          _hover: {
            bg: 'secondary.400',
            backgroundColor: 'secondary.400',
            color: 'white',
          },
          _active: {
            bg: 'secondary.500',
            backgroundColor: 'secondary.500',
            borderColor: 'secondary.500',
            color: 'white',
          },
        },
      },
      sizes: {
        lg: {
          fontSize: '26px',
        },
        xl: {
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
    Input: {
      baseStyle: {
        field: {
          color: 'gray.600',
          bg: 'gray.400',
          backgroundColor: 'gray.400',
          fontWeight: 600,
          fontSize: '16px',
          _placeholder: {
            color: 'rgba(0, 0, 0, .3)',
          },
          _focus: {
            bg: 'gray.300',
            backgroundColor: 'gray.300',
          },
        },
      },
    },
  },
  colors: {
    primary: {
      300: '#9882FF',
      400: '#6847FF',
      500: '#34218C',
      600: '#1A1240',
    },

    secondary: {
      400: '#00E4C9',
      500: '#00A1A1',
    },

    gray: {
      300: '#ECECEC',
      400: '#CCCCCC',
      500: '#5D5D5D',
      600: '#434343',
    },
  },
})
