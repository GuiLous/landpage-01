import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  components: {
    Button: {
      baseStyle: {
        bg: 'primary.400',
        backgroundColor: 'primary.400',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'semiBold',
        minHeight: '42px',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 4,
        _loading: {
          _hover: {
            bg: 'gray.750',
            backgroundColor: 'gray.750',
          },
        },
        _hover: {
          bg: 'primary.300',
          backgroundColor: 'primary.300',
          _disabled: {
            bg: 'gray.750',
            backgroundColor: 'gray.750',
            color: 'gray.550',
          },
        },
        _active: {
          bg: 'primary.600',
          backgroundColor: 'primary.600',
        },
        _disabled: {
          backgroundColor: 'gray.750',
          color: 'gray.550',
          opacity: 1,
          fontWeight: 'semiBold',
          fontSize: 14,
          _hover: {
            backgroundColor: 'gray.750',
            color: 'gray.550',
          },
        },
      },
      variants: {
        queue: {
          bg: 'primary.500',
          backgroundColor: 'primary.500',
          cursor: 'pointer',
          _hover: {
            bg: 'primary.500',
            backgroundColor: 'primary.500',
          },
        },

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
          fontSize: 14,
          fontWeight: 'semiBold',
          _hover: {
            bg: 'danger.500',
            backgroundColor: 'danger.500',
            color: 'white',
            _disabled: {
              bg: 'danger.750',
              backgroundColor: 'danger.750',
              color: 'gray.550',
            },
          },
          _active: {
            bg: 'danger.500',
            backgroundColor: 'danger.500',
            borderColor: 'danger.500',
            color: 'white',
          },
          _loading: {
            _hover: {
              bg: 'danger.750',
              backgroundColor: 'danger.750',
              color: 'gray.550',
            },
          },
        },

        restricted: {
          bg: 'danger.400',
          backgroundColor: 'danger.400',
          borderColor: 'danger.400',
          color: 'white',
          _disabled: {
            bg: 'danger.400',
            backgroundColor: 'danger.400',
            color: 'white',
            opacity: 1,
          },
          _active: {
            bg: 'danger.600',
            backgroundColor: 'danger.600',
            borderColor: 'danger.600',
            color: 'white',
          },
          _hover: {
            bg: 'danger.400',
            backgroundColor: 'danger.400',
            color: 'white',
            _disabled: {
              bg: 'danger.400',
              backgroundColor: 'danger.400',
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

        neutral: {
          backgroundColor: 'gray.400',
          color: 'gray.700',
          textTransform: 'uppercase',
          fontWeight: 'semiBold',
          minHeight: '42px',
          paddingLeft: 16,
          paddingRight: 16,
          borderRadius: 4,
          _loading: {
            _hover: {
              bg: 'gray.750',
              backgroundColor: 'gray.750',
            },
          },
          _hover: {
            backgroundColor: 'gray.350',
            color: 'white',
            _disabled: {
              backgroundColor: 'gray.750',
              color: 'gray.550',
            },
          },
          _disabled: {
            backgroundColor: 'gray.750',
            color: 'gray.550',
            opacity: 1,
            fontWeight: 'semiBold',
            fontSize: 14,
            _hover: {
              backgroundColor: 'gray.750',
              color: 'gray.550',
            },
          },
          _active: {
            backgroundColor: 'gray.350',
            color: 'white',
          },
        },

        outline: {
          bg: 'transparent',
          backgroundColor: 'transparent',
          borderColor: 'gray.700',
          color: 'gray.700',
          fontSize: '14px',
          fontWeight: 'regular',
          _hover: {
            bg: 'transparent',
            backgroundColor: 'transparent',
            borderColor: 'white',
            color: 'white',
            _disabled: {
              bg: 'transparent',
              backgroundColor: 'transparent',
            },
          },
          _disabled: {
            bg: 'transparent',
            backgroundColor: 'transparent',
            borderColor: 'gray.600',
            color: 'gray.600',
            _hover: {
              bg: 'transparent',
              backgroundColor: 'transparent',
              borderColor: 'gray.600',
              color: 'gray.600',
            },
          },
          _active: {
            bg: 'transparent',
            backgroundColor: 'transparent',
            borderColor: 'white',
            color: 'white',
            cursor: 'default',
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
          fontSize: '14px',
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
          color: 'white',
          textDecoration: 'none',
        },
        _active: {
          color: 'white',
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
        focusBorderColor: 'primary.400',
        errorBorderColor: 'danger.400',
      },
      baseStyle: {
        field: {
          color: 'gray.600',
          bg: 'white',
          backgroundColor: 'white',
          borderRadius: '4px',
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
        secondary: {
          field: {
            color: 'white',
            bg: 'gray.400',
            backgroundColor: 'gray.400',
            fontSize: '14px',
            fontWeight: '400',
            pl: '16px',
            pr: '16px',
            borderRadius: 4,
            minHeight: '42px',
            cursor: 'pointer',
            border: '1px solid gray.400',
            _hover: {
              bg: 'gray.400',
              backgroundColor: 'gray.400',
            },
            _focus: {
              color: 'gray.700',
              bg: 'gray.400',
              backgroundColor: 'gray.400',
              border: '1px solid #6847FF',
              pl: '15px',
            },
            _disabled: {
              cursor: 'pointer',
              opacity: 1,
              bg: 'black.900',
              backgroundColor: 'black.900',
              border: '1px solid #333333',
              color: 'gray.700',
              _hover: {
                bg: 'black.900',
                backgroundColor: 'black.900',
              },
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
        darker: {
          field: {
            bg: 'gray.800',
            backgroundColor: 'gray.800',
          },
        },
        lighter: {
          field: {
            bg: 'gray.400',
            backgroundColor: 'gray.400',
          },
        },
      },
    },
    Textarea: {
      variants: {
        primary: {
          bg: 'black.900',
          color: 'white',
          border: '1px solid',
          borderColor: 'gray.400',
          borderRadius: 4,
          resize: 'none',
          minHeight: '98px',
          lineHeight: 1,
          p: 4,
          fontSize: '12px',
          fontWeight: '400',
          _placeholder: {
            color: 'gray.700',
          },
          _hover: {
            borderColor: 'primary.400',
          },
          _focus: {
            color: 'white',
            _placeholder: {
              color: 'white',
            },
          },
          _invalid: {
            borderColor: 'danger.400',
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
        focusBorderColor: 'primary.400',
        errorBorderColor: 'danger.400',
      },
      baseStyle: {
        color: 'gray.400',
        bg: 'white',
        backgroundColor: 'white',
        borderRadius: 4,
        minW: '56px',
        minH: '56px',
        fontWeight: 'medium',
        _placeholder: {
          color: 'gray.700',
        },
        _invalid: {
          color: 'danger.400',
        },
      },
      sizes: {
        md: {
          fontSize: 26,
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          backgroundColor: 'gray.800',
          bg: 'gray.800',
          color: 'white',
          position: 'relative',
        },
        closeButton: {
          color: '#fff',
          fontSize: '18px',
        },
        overlay: {
          bg: 'rgba(0, 0, 0, .85)',
          backdropFilter: 'blur(5px)',
        },
        header: {
          textTransform: 'uppercase',
          fontSize: '24px',
          fontWeight: '700',
        },
      },
    },
    Drawer: {
      baseStyle: {
        dialog: {
          backgroundColor: 'gray.900',
          bg: 'gray.900',
          color: 'white',
          position: 'relative',
        },
        closeButton: {
          color: '#fff',
          fontSize: '18px',
        },
        header: {
          textTransform: 'uppercase',
          fontSize: '16px',
          fontWeight: 'semiBold',
          mb: 6,
          py: 0,
          px: 6,
        },
      },
      variants: {
        friendList: {
          dialog: {
            marginLeft: { base: '300px', md: '250px', '2xl': '300px' },
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        bg: 'primary.400',
        color: 'white',
        borderRadius: '67px',
        padding: '4px 10px',
        fontWeight: 'regular',
        fontSize: '10px',
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
          bg: 'primary.400',
          backgroundColor: 'primary.400',
          borderRadius: '50%',
          height: '9px',
          width: '9px',
          padding: 'initial',
        },

        counter: {
          bg: 'primary.400',
          backgroundColor: 'primary.400',
          borderRadius: '50%',
          padding: 'initial',
          fontSize: '12px',
          fontWeight: 'regular',
          textAlign: 'center',
          width: '22px',
          height: '22px',
          paddingTop: '2px',
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
        white: {
          container: {
            borderColor: 'white',
          },
        },
      },
      sizes: {
        xxs: {
          container: {
            width: '16px',
            height: '16px',
            borderWidth: '0',
          },
        },
        xs: {
          container: {
            width: '24px',
            height: '24px',
            borderWidth: '0',
          },
        },
        sm: {
          container: {
            width: '32px',
            height: '32px',
            borderWidth: '2px',
          },
        },
        smd: {
          container: {
            width: '38px',
            height: '38px',
            borderWidth: '2px',
          },
        },
        md: {
          container: {
            width: '44px',
            height: '44px',
            borderWidth: '2px',
          },
        },
        lg: {
          container: {
            width: '64px',
            height: '64px',
            borderWidth: '3px',
          },
        },
        xl: {
          container: {
            width: '96px',
            height: '96px',
            borderWidth: '4px',
          },
        },
        xxl: {
          container: {
            width: '128px',
            height: '128px',
            borderWidth: '6px',
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
    Tooltip: {
      baseStyle: {
        bg: '#1E1E1E',
        color: 'white',
        zIndex: 99999,
      },
    },
    Divider: {
      baseStyle: {
        borderColor: 'gray.600',
        margin: 0,
        padding: 0,
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
      500: '#FF4242',
      600: '#8d1919',
    },

    win: '#26BD39',

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
      350: '#3d3d3d',
      400: '#333333',
      500: '#282828',
      550: '#444444',
      600: '#434343',
      625: '#c8c5c5',
      650: '#B7B7B7',
      700: '#999999',
      750: '#282828',
      800: '#1E1E1E',
      900: '#222222',
    },

    black: {
      300: '#1B1B1B',
      400: '#000000',
      900: '#111111',
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
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1600px',
  },
})
