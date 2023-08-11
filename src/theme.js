import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  components: {
    Button: {
      baseStyle: {
        bg: 'purple.400',
        backgroundColor: 'purple.400',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'semiBold',
        minHeight: '42px',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 4,
        _loading: {
          _hover: {
            bg: 'gray.800',
            backgroundColor: 'gray.800',
          },
        },
        _hover: {
          bg: 'purple.300',
          backgroundColor: 'purple.300',
          _disabled: {
            bg: 'gray.800',
            backgroundColor: 'gray.800',
            color: 'gray.400',
          },
        },
        _active: {
          bg: 'purple.700',
          backgroundColor: 'purple.700',
        },
        _disabled: {
          backgroundColor: 'gray.800',
          color: 'gray.400',
          opacity: 1,
          fontWeight: 'semiBold',
          fontSize: 14,
          _hover: {
            backgroundColor: 'gray.800',
            color: 'gray.400',
          },
        },
      },
      variants: {
        queue: {
          bg: 'purple.500',
          backgroundColor: 'purple.500',
          cursor: 'pointer',
          _hover: {
            bg: 'purple.500',
            backgroundColor: 'purple.500',
          },
        },

        secondary: {
          color: 'white',
          bg: 'transparent',
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: 'cyan.400',
          paddingLeft: 0,
          paddingRight: 0,
          _hover: {
            bg: 'cyan.400',
            backgroundColor: 'cyan.400',
            color: 'white',
            _disabled: {
              bg: 'transparent',
              backgroundColor: 'transparent',
            },
          },
          _active: {
            bg: 'cyan.500',
            backgroundColor: 'cyan.500',
            borderColor: 'cyan.500',
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
          bg: 'red.500',
          backgroundColor: 'red.500',
          borderColor: 'red.500',
          color: 'white',
          fontSize: 14,
          fontWeight: 'semiBold',
          _hover: {
            bg: 'red.400',
            backgroundColor: 'red.400',
            color: 'white',
            _disabled: {
              bg: 'danger.600',
              backgroundColor: 'danger.600',
              color: 'gray.400',
            },
          },
          _active: {
            bg: 'red.400',
            backgroundColor: 'red.400',
            borderColor: 'red.400',
            color: 'white',
          },
          _loading: {
            _hover: {
              bg: 'danger.600',
              backgroundColor: 'danger.600',
              color: 'gray.400',
            },
          },
        },

        restricted: {
          bg: 'red.500',
          backgroundColor: 'red.500',
          borderColor: 'red.500',
          color: 'white',
          _disabled: {
            bg: 'red.500',
            backgroundColor: 'red.500',
            color: 'white',
            opacity: 1,
          },
          _active: {
            bg: 'red.600',
            backgroundColor: 'red.600',
            borderColor: 'red.600',
            color: 'white',
          },
          _hover: {
            bg: 'red.500',
            backgroundColor: 'red.500',
            color: 'white',
            _disabled: {
              bg: 'red.500',
              backgroundColor: 'red.500',
              color: 'white',
            },
          },
        },

        pagination: {
          backgroundColor: 'gray.700',
          borderRadius: '8px',
          fontWeight: 'semiBold',
          fontSize: 16,
          color: 'gray.300',
          cursor: 'pointer',
          width: '32px',
          height: '32px',
          minHeight: 'initial',
          minWidth: 'initial',
          ps: 0,
          pe: 0,
          mr: 0,
          pt: '1px',
          _disabled: {
            fontSize: 16,
            backgroundColor: 'gray.400',
            color: 'white',
            cursor: 'initial',
            opacity: 1,
          },
          _active: {
            backgroundColor: 'gray.400',
            color: 'white',
          },
          _hover: {
            color: 'white',
            bgColor: 'gray.400',
            _disabled: {
              backgroundColor: 'gray.400',
              color: 'white',
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
          backgroundColor: 'gray.700',
          color: 'gray.300',
          textTransform: 'uppercase',
          fontWeight: 'semiBold',
          minHeight: '42px',
          paddingLeft: 16,
          paddingRight: 16,
          borderRadius: 4,
          _loading: {
            _hover: {
              bg: 'gray.800',
              backgroundColor: 'gray.800',
            },
          },
          _hover: {
            backgroundColor: 'gray.600',
            color: 'white',
            _disabled: {
              backgroundColor: 'gray.800',
              color: 'gray.400',
            },
          },
          _disabled: {
            backgroundColor: 'gray.800',
            color: 'gray.400',
            opacity: 1,
            fontWeight: 'semiBold',
            fontSize: 14,
            _hover: {
              backgroundColor: 'gray.800',
              color: 'gray.400',
            },
          },
          _active: {
            backgroundColor: 'gray.600',
            color: 'white',
          },
        },

        outline: {
          bg: 'transparent',
          backgroundColor: 'transparent',
          borderColor: 'gray.300',
          color: 'gray.300',
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
            borderColor: 'gray.500',
            color: 'gray.500',
            _hover: {
              bg: 'transparent',
              backgroundColor: 'transparent',
              borderColor: 'gray.500',
              color: 'gray.500',
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
          color: 'cyan.500',
          cursor: 'default',
          _hover: {
            color: 'cyan.500',
            textDecoration: 'none',
          },
          _active: {
            color: 'cyan.500',
          },
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'purple.400',
        errorBorderColor: 'red.500',
      },
      baseStyle: {
        field: {
          color: 'gray.500',
          bg: 'white',
          backgroundColor: 'white',
          borderRadius: '4px',
          fontSize: '16px',
          _placeholder: {
            color: 'gray.300',
          },
          _invalid: {
            color: 'red.500',
          },
        },
      },
      variants: {
        filled: {
          field: {
            color: 'white',
            bg: 'gray.500',
            backgroundColor: 'gray.500',
            fontSize: '14px',
            fontWeight: '200',
            _hover: {
              color: 'white',
              bg: 'gray.500',
              backgroundColor: 'gray.500',
            },
            _focus: {
              color: 'white',
              bg: 'gray.500',
              backgroundColor: 'gray.500',
            },
          },
        },
        secondary: {
          field: {
            color: 'white',
            bg: 'gray.700',
            backgroundColor: 'gray.700',
            fontSize: '14px',
            fontWeight: '400',
            pl: '16px',
            pr: '16px',
            borderRadius: 4,
            minHeight: '42px',
            cursor: 'pointer',
            border: '1px solid gray.700',
            _hover: {
              bg: 'gray.700',
              backgroundColor: 'gray.700',
            },
            _focus: {
              color: 'gray.300',
              bg: 'gray.700',
              backgroundColor: 'gray.700',
              border: '1px solid #6847FF',
              pl: '15px',
            },
            _disabled: {
              cursor: 'pointer',
              opacity: 1,
              bg: 'gray.1200',
              backgroundColor: 'gray.1200',
              border: '1px solid #333333',
              color: 'gray.300',
              _hover: {
                bg: 'gray.1200',
                backgroundColor: 'gray.1200',
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
            bg: 'gray.1000',
            backgroundColor: 'gray.1000',
          },
        },
        lighter: {
          field: {
            padding: 3,
            bg: 'gray.700',
            backgroundColor: 'gray.700',
            fontWeight: 'regular',
            _focus: {
              border: '1px solid',
              borderColor: 'purple.400',
              padding: '11px',
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        primary: {
          bg: 'gray.1200',
          color: 'white',
          border: '1px solid',
          borderColor: 'gray.700',
          borderRadius: 4,
          resize: 'none',
          minHeight: '98px',
          lineHeight: 1,
          p: 4,
          fontSize: '12px',
          fontWeight: '400',
          _placeholder: {
            color: 'gray.300',
          },
          _hover: {
            borderColor: 'purple.400',
          },
          _focus: {
            color: 'white',
            _placeholder: {
              color: 'white',
            },
          },
          _invalid: {
            borderColor: 'red.500',
          },
        },
      },
    },
    Form: {
      baseStyle: {
        helperText: {
          color: 'gray.700',
        },
      },
    },
    FormError: {
      baseStyle: {
        text: {
          color: 'red.500',
        },
      },
    },
    PinInput: {
      defaultProps: {
        focusBorderColor: 'purple.400',
        errorBorderColor: 'red.500',
      },
      baseStyle: {
        color: 'gray.700',
        bg: 'white',
        backgroundColor: 'white',
        borderRadius: 4,
        minW: '56px',
        minH: '56px',
        fontWeight: 'medium',
        _placeholder: {
          color: 'gray.300',
        },
        _invalid: {
          color: 'red.500',
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
          backgroundColor: 'gray.1000',
          bg: 'gray.1000',
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
          zIndex: 'drawer',
        },
        dialogContainer: {
          zIndex: 'drawer',
        },
        overlay: {
          zIndex: 'drawer',
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
        bg: 'purple.400',
        color: 'white',
        borderRadius: '67px',
        padding: '4px 10px',
        fontWeight: 'regular',
        fontSize: '10px',
      },
      variants: {
        online: {
          backgroundColor: 'green.600',
          borderRadius: '50%',
          height: '10px',
          width: '10px',
          padding: 'initial',
        },
        offline: {
          backgroundColor: 'gray.300',
          borderRadius: '50%',
          height: '10px',
          width: '10px',
          padding: 'initial',
        },
        teaming: {
          backgroundColor: 'purple.300',
          borderRadius: '50%',
          height: '10px',
          width: '10px',
          padding: 'initial',
        },
        in_game: {
          backgroundColor: 'yellow.500',
          borderRadius: '50%',
          height: '10px',
          width: '10px',
          padding: 'initial',
        },
        queued: {
          backgroundColor: 'yellow.500',
          borderRadius: '50%',
          height: '10px',
          width: '10px',
          padding: 'initial',
        },

        primary: {
          bg: 'purple.400',
          backgroundColor: 'purple.400',
          fontWeight: 'lighter',
          fontSize: '14px',
          padding: '0 5px',
          letterSpacing: '-1px',
          borderRadius: '4px',
        },

        unread: {
          bg: 'purple.400',
          backgroundColor: 'purple.400',
          borderRadius: '50%',
          height: '9px',
          width: '9px',
          padding: 'initial',
        },

        counter: {
          bg: 'purple.400',
          backgroundColor: 'purple.400',
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
          bg: 'gray.300',
          backgroundColor: 'gray.300',
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
              backgroundColor: 'purple.400',
              bg: 'purple.400',
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
          badge: {
            boxSize: '12px',
            backgroundColor: 'green.600',
            bg: 'green.600',
            border: '2px solid',
            right: '2px',
            bottom: '2px',
          },
        },
        offline: {
          badge: {
            boxSize: '12px',
            backgroundColor: 'gray.300',
            bg: 'gray.300',
            border: '2px solid',
            right: '2px',
            bottom: '2px',
          },
        },
        teaming: {
          badge: {
            boxSize: '12px',
            backgroundColor: 'purple.300',
            bg: 'purple.300',
            border: '2px solid',
            right: '2px',
            bottom: '2px',
          },
        },
        in_game: {
          badge: {
            boxSize: '12px',
            backgroundColor: 'yellow.500',
            bg: 'yellow.500',
            border: '2px solid',
            right: '2px',
            bottom: '2px',
          },
        },
        queued: {
          badge: {
            boxSize: '12px',
            backgroundColor: 'yellow.500',
            bg: 'yellow.500',
            border: '2px solid',
            right: '2px',
            bottom: '2px',
          },
        },
        white: {
          container: {
            borderColor: 'white',
          },
        },
        purple: {
          container: {
            border: '2px solid #6847FF',
          },
        },
      },
      sizes: {
        xxs: {
          container: {
            width: '16px',
            height: '16px',
          },
        },
        xs: {
          container: {
            width: '24px',
            height: '24px',
          },
        },
        sm: {
          container: {
            width: '32px',
            height: '32px',
          },
        },
        smd: {
          container: {
            width: '38px',
            height: '38px',
          },
        },
        md: {
          container: {
            width: '44px',
            height: '44px',
          },
        },
        lg: {
          container: {
            width: '64px',
            height: '64px',
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
            width: '112px',
            height: '112px',
            borderWidth: '4px',
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
            bg: 'purple.400',
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
          bg: 'purple.400',
        },
      },
    },
    Tooltip: {
      baseStyle: {
        bg: '#1E1E1E',
        color: 'white',
        zIndex: 'tooltip',
      },
    },
    Divider: {
      baseStyle: {
        borderColor: 'gray.500',
        margin: 0,
        padding: 0,
      },
    },
  },
  colors: {
    purple: {
      300: '#9882FF',
      400: '#6847FF',
      500: '#34218C',
      600: '#3d336d',
      700: '#1A1240',
    },
    gray: {
      100: '#c8c5c5',
      200: '#B7B7B7',
      300: '#999999',
      400: '#444444',
      500: '#434343',
      600: '#3d3d3d',
      700: '#333333',
      800: '#282828',
      900: '#222222',
      1000: '#1E1E1E',
      1100: '#1B1B1B',
      1200: '#111111',
    },
    cyan: {
      400: '#00E4C9',
      500: '#00A1A1',
    },
    green: {
      400: '#6BE400',
      500: '#2BD641',
      600: '#26BD39',
    },
    yellow: {
      400: '#FFD426',
      500: '#E4BC00',
    },
    red: {
      400: '#FF4242',
      500: '#F63535',
      600: '#8d1919',
    },
    salmon: {
      500: '#F0A87B',
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
  zIndices: {
    one: 1,
    two: 2,
    three: 3,
    drawer: 1000,
  },
})
