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
            _disabled: {
              bg: 'danger.600',
              backgroundColor: 'danger.600',
              color: 'white',
            },
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

        restricted: {
          bg: 'rgba(246, 53, 53, .8)',
          backgroundColor: 'rgba(246, 53, 53, .8)',
          borderColor: 'rgba(246, 53, 53, .8)',
          color: 'white',
          _disabled: {
            bg: 'rgba(246, 53, 53, .8)',
            backgroundColor: 'rgba(246, 53, 53, .8)',
            color: 'white',
            opacity: 1,
          },
          _hover: {
            bg: 'rgba(246, 53, 53, .8)',
            backgroundColor: 'rgba(246, 53, 53, .8)',
            color: 'white',
            _disabled: {
              bg: 'rgba(246, 53, 53, .8)',
              backgroundColor: 'rgba(246, 53, 53, .8)',
              color: 'white',
            },
          },
        },

        pagination: {
          bg: 'transparent',
          backgroundColor: 'transparent',
          borderRadius: 'full',
          border: '1px solid',
          borderColor: '#444444',
          fontWeight: 'normal',
          fontSize: 12,
          color: '#444444',
          cursor: 'pointer',
          width: '26px',
          height: '26px',
          padding: '0 0 0 1px',
          minHeight: 'initial',
          minWidth: 'initial',
          _disabled: {
            bg: 'primary.400',
            backgroundColor: 'primary.400',
            color: 'white',
            cursor: 'initial',
            border: '1px solid',
            borderColor: 'primary.400',
            opacity: 1,
            _active: {
              color: 'white',
            },
          },
          _active: {
            bg: 'transparent',
            backgroundColor: 'transparent',
            borderColor: '#444444',
            color: '#444444',
          },
          _hover: {
            color: 'white',
            borderColor: 'white',
            bgColor: 'transparent',
            _disabled: {
              borderColor: 'primary.400',
            },
          },
        },

        unstyled: {
          bg: 'transparent',
          backgroundColor: 'transparent',
          color: 'white',
          border: 'none',
          _hover: {
            bg: 'transparent',
            backgroundColor: 'transparent',
            color: 'white',
            _disabled: {
              bg: 'transparent',
              backgroundColor: 'transparent',
            },
          },
          _active: {
            bg: 'transparent',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
          },
          _loading: {
            _hover: {
              bg: 'transparent',
              backgroundColor: 'transparent',
            },
          },
        },
      },
      sizes: {
        lg: {
          fontSize: '26px',
        },
        xl: {
          fontSize: '28px',
          fontWeight: 'bold',
          minHeight: '73px',
          minWidth: '273px',
          paddingLeft: '20px',
          paddingRight: '20px',
          letterSpacing: '1px',
        },
        md: {
          fontSize: '16px',
        },
        sm: {
          minHeight: '24px',
          paddingTop: '2px',
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
      variants: {
        filled: {
          field: {
            color: 'white',
            bg: 'gray.600',
            backgroundColor: 'gray.600',
            fontSize: '14px',
            fontWeight: '200',
            _hover: {
              color: 'white',
              bg: 'gray.600',
              backgroundColor: 'gray.600',
            },
            _focus: {
              color: 'white',
              bg: 'gray.600',
              backgroundColor: 'gray.600',
            },
          },
        },
        clean: {
          field: {
            bg: 'transparent',
            backgroundColor: 'transparent',
            color: 'white',
          },
          addon: {
            bg: 'transparent',
            backgroundColor: 'transparent',
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
          position: 'relative',
        },
        closeButton: {
          color: '#F5F6F8',
          opacity: 0.5,
          fontSize: '18px',
          _hover: {
            opacity: 1,
          },
        },
        overlay: {
          bg: 'rgba(0, 0, 0, .85)',
          backdropFilter: 'blur(5px)',
        },
        header: {
          textTransform: 'uppercase',
          fontSize: '24px',
          fontWeight: '800',
        },
      },
    },
    Badge: {
      baseStyle: {
        bg: 'primary.400',
        color: 'white',
        borderRadius: '10px',
        padding: '0 8px',
      },
      variants: {
        online: {
          bg: 'success',
          backgroundColor: 'success',
          borderRadius: '50%',
          height: '9px',
          width: '9px',
          padding: 'initial',
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
          padding: 'initial',
        },

        disabled: {
          bg: 'gray.700',
          backgroundColor: 'gray.700',
          borderRadius: '50%',
          height: '9px',
          width: '9px',
          padding: 'initial',
        },
      },
      sizes: {
        sm: {
          fontSize: '10px',
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
      baseStyle: {
        container: {
          borderWidth: '2px ',
          borderColor: 'primary.400',
          borderStyle: 'solid',
        },
      },
      variants: {
        online: {
          container: {
            borderWidth: '2px ',
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
      },
      sizes: {
        lg: {
          container: {
            width: '55px',
            height: '55px',
          },
        },
        xl: {
          container: {
            width: '70px',
            height: '70px',
          },
        },
      },
    },
    Alert: {
      baseStyle: {
        container: {
          maxWidth: '500px',
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
    Progress: {
      baseStyle: {
        track: {
          bg: '#d9d9d9',
          borderRadius: '8px',
        },
        filledTrack: {
          bg: 'primary.400',
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
    warning: '#FFD426',

    online: '#6BE400',
    offline: '#999999',
    teaming: '#9882FF',
    in_game: '#E4BC00',
    queued: '#E4BC00',

    gray: {
      200: '#F5F6F8',
      300: '#ECECEC',
      400: '#333333',
      500: '#282828',
      600: '#434343',
      700: '#999999',
      750: '#282828',
      800: '#1E1E1E',
      900: '#222222',
    },

    stripe: {
      100: '#111111',
    },
  },
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
})
