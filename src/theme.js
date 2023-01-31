import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  components: {
    Button: {
      baseStyle: {
        bg: 'primary.400',
        backgroundColor: 'primary.400',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'normal',
        minHeight: '44px',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 8,
        _loading: {
          _hover: {
            bg: 'primary.400',
            backgroundColor: 'primary.400',
          },
        },
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

        danger: {
          bg: 'danger.400',
          backgroundColor: 'danger.400',
          borderColor: 'danger.400',
          color: 'white',
          _hover: {
            bg: 'danger.600',
            backgroundColor: 'danger.600',
            color: 'white',
          },
          _active: {
            bg: 'danger.600',
            backgroundColor: 'danger.600',
            borderColor: 'danger.600',
            color: 'white',
          },
          _loading: {
            _hover: {
              bg: 'danger.400',
              backgroundColor: 'danger.400',
            },
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
        sm: {
          minHeight: '24px',
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
      variants: {
        inline: {
          textDecoration: 'underline',
          _hover: {
            textDecoration: 'underline',
          },
        },

        active: {
          color: 'secondary.500',
          cursor: 'default',
          _hover: {
            color: 'secondary.500',
            textDecoration: 'none',
          },
          _active: {
            color: 'secondary.500',
          },
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'secondary.400',
        errorBorderColor: 'danger.400',
      },
      baseStyle: {
        field: {
          color: 'gray.600',
          bg: 'white',
          backgroundColor: 'white',
          fontSize: '16px',
          _placeholder: {
            color: 'gray.700',
          },
          _invalid: {
            color: 'danger.400',
          },
        },
      },
    },
    Form: {
      baseStyle: {
        helperText: {
          color: 'gray.400',
        },
      },
    },
    FormError: {
      baseStyle: {
        text: {
          color: 'danger.400',
        },
      },
    },
    PinInput: {
      defaultProps: {
        focusBorderColor: 'secondary.400',
        errorBorderColor: 'danger.400',
      },
      baseStyle: {
        color: 'gray.600',
        bg: 'white',
        backgroundColor: 'white',
        fontSize: '16px',
        _placeholder: {
          color: 'gray.700',
        },
        _invalid: {
          color: 'danger.400',
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          backgroundColor: '#222222',
          bg: '#222222',
        },
        closeButton: {
          color: '#F5F6F8',
          opacity: 0.5,
          _hover: {
            opacity: 1,
          },
        },
      },
    },
    Tabs: {
      variants: {
        primary: {
          root: {
            height: '100%',
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          },
          tablist: {
            flex: 0,
            display: 'flex',
          },
          tab: {
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            padding: '5px 9px',
            _selected: {
              borderRadius: '8px',
              backgroundColor: 'primary.400',
              bg: 'primary.400',
            },
            _active: {
              borderRadius: '8px',
            },
            _focus: {
              borderRadius: '8px',
            },
          },
          tabpanels: {
            padding: 0,
            flex: 1,
            display: 'flex',
          },
          tabpanel: {
            padding: 0,
            flex: 1,
            display: 'flex',
          },
        },
        body: {
          color: 'white',
        },
        header: {
          color: 'white',
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

    danger: {
      400: '#F63535',
      600: '#8d1919',
    },

    gray: {
      300: '#ECECEC',
      400: '#CCCCCC',
      500: '#5D5D5D',
      600: '#434343',
      700: '#999999',
    },
  },
})
