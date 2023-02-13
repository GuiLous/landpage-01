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
            _disabled: {
              bg: 'transparent',
              backgroundColor: 'transparent',
            },
          },
          _active: {
            bg: 'secondary.500',
            backgroundColor: 'secondary.500',
            borderColor: 'secondary.500',
            color: 'white',
          },
          _loading: {
            _hover: {
              bg: 'transparent',
              backgroundColor: 'transparent',
            },
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
        color: 'black',
        bg: 'white',
        backgroundColor: 'white',
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
          color: 'white',
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
    Badge: {
      variants: {
        online: {
          bg: 'success',
          backgroundColor: 'success',
          borderRadius: '50%',
          height: '9px',
          width: '9px',
        },

        primary: {
          bg: 'primary.400',
          backgroundColor: 'primary.400',
          fontWeight: 'lighter',
          fontSize: '14px',
          padding: '0 5px',
          letterSpacing: '-1px',
          borderRadius: '4px',
        },

        unread: {
          bg: 'secondary.400',
          backgroundColor: 'secondary.400',
          borderRadius: '50%',
          height: '9px',
          width: '9px',
        },
      },
    },
    Tabs: {
      variants: {
        primary: {
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
          tabpanel: {
            padding: 0,
          },
        },
      },
    },
    Avatar: {
      variants: {
        online: {
          container: {
            borderWidth: '3px ',
            borderColor: 'online',
            borderStyle: 'solid',
          },
          badge: {
            boxSize: '11px',
            backgroundColor: 'online',
            bg: 'online',
            border: 'none',
            top: '-2px',
            right: 0,
          },
        },
        offline: {
          container: {
            borderWidth: '3px ',
            borderColor: 'offline',
            borderStyle: 'solid',
          },
          badge: {
            boxSize: '11px',
            backgroundColor: 'offline',
            bg: 'offline',
            border: 'none',
            top: 0,
            right: 0,
          },
        },
        teaming: {
          container: {
            borderWidth: '3px ',
            borderColor: 'teaming',
            borderStyle: 'solid',
          },
          badge: {
            boxSize: '11px',
            backgroundColor: 'teaming',
            bg: 'teaming',
            border: 'none',
            top: 0,
            right: 0,
          },
        },
        in_game: {
          container: {
            borderWidth: '3px ',
            borderColor: 'in_game',
            borderStyle: 'solid',
          },
          badge: {
            boxSize: '11px',
            backgroundColor: 'in_game',
            bg: 'in_game',
            border: 'none',
            top: 0,
            right: 0,
          },
        },
        queued: {
          container: {
            borderWidth: '3px ',
            borderColor: 'queued',
            borderStyle: 'solid',
          },
          badge: {
            boxSize: '11px',
            backgroundColor: 'queued',
            bg: 'queued',
            border: 'none',
            top: 0,
            right: 0,
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
    Alert: {
      baseStyle: {
        container: {
          maxWidth: '300px',
        },
        title: {
          fontSize: '14px',
        },
        description: {
          fontSize: '14px',
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: '#C4C4C4',
          _checked: {
            bg: 'primary.400',
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

    danger: {
      400: '#F63535',
      600: '#8d1919',
    },

    success: '#6BE400',

    online: '#6BE400',
    offline: '#999999',
    teaming: '#9882FF',
    in_game: '#E4BC00',
    queued: '#E4BC00',

    gray: {
      300: '#ECECEC',
      400: '#CCCCCC',
      500: '#5D5D5D',
      600: '#434343',
      700: '#999999',
    },
  },
})
