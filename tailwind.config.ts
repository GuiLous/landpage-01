import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': { max: '1600px' },
        '2xl': { max: '1536px' },
        img_link: { max: '1400px' },
        xl: { max: '1279px' },
        lg: { max: '1023px' },
        md: { max: '767px' },
        sm: { max: '639px' },
        'range-md-xl': { min: '913px', max: '1279px' },
      },
      flex: {
        file_card: '0 0 48.5%',
      },
      minHeight: {
        friends: 'calc(100vh - 120px)',
      },
      maxHeight: {
        friends: 'calc(100vh - 120px)',
        notifications: 'calc(100vh - 64px)',
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
          50: '#d9d9d9',
          100: '#c8c5c5',
          200: '#B7B7B7',
          300: '#999999',
          400: '#444444',
          500: '#434343',
          600: '#3d3d3d',
          700: '#333333',
          750: '#2f2f2f',
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
      dropShadow: {
        support_confirmation: 'drop-shadow(0 0 80px rgba(104,71,255,0.25))',
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
      },
      backgroundImage: {
        home: "url('~/src/assets/images/home_bg.png')",
        home_mobile:
          "url('~/src/assets/images/home_mobile_bg_top.png'), url('~/src/assets/images/home_mobile_bg_bottom.png')",
        sign_up_bottom_left:
          "linear-gradient(201deg, #000 0%, rgba(0, 0, 0, 0) 100%), url('~/src/assets/images/signup_bg_bottom_left.png')",
        not_found: "url('~/src/assets/images/bg_404.png')",
        maintenance: "url('~/src/assets/images/bg_maintenance.png')",
        player_card: "url('~/src/assets/images/lobby_player_card_bg.jpg')",
        connect: "url('~/src/assets/images/connect_bg.png')",
        profile_header: "url('~/src/assets/images/profile_header_bg.jpg')",
        gradient_drawer_friends:
          'linear-gradient(360deg, #1e1e1e 0%, #1e1e1e00 100%)',
        gradient_friends_invite:
          'linear-gradient(90deg, #6847ff80 0%, #33333300 100%, #1e1e1e)',
        gradient_friend:
          'linear-gradient(90deg, #33333380 0%, #33333300 100%, #1e1e1e)',
        gradient_notification:
          'linear-gradient(90deg, #6847ff80 0%, #33333300 100%, #1e1e1e)',
        gradient_seat: 'linear-gradient(to bottom, #6847FF 0%, #2f2f2f 80%)',
        gradient_menu_item:
          'linear-gradient(0deg, #6847ff4c 0%, #6847ff4c 100%, #333)',
        gradient_menu_invited:
          'linear-gradient(0deg, #6847ff4d 0%, #6847ff4d 100%, #333)',
        gradient_toast_info:
          'linear-gradient(to right, #6847ff1a, #6847ff00 50%)',
        gradient_toast_success:
          'linear-gradient(to right, #6be4001a, #6be40000 50%)',
        gradient_toast_warning:
          'linear-gradient(to right, #ffd4261a, #ffd42600 50%)',
        gradient_toast_error:
          'linear-gradient(to right, #f635351a, #f6353500 50%)',
        gradient_match_link_base:
          'linear-gradient(90deg, #6847ff33 0%, #282828 9.27%)',
        gradient_match_link_won:
          'linear-gradient(90deg, rgba(38, 189, 57, 0.2) 0%, #282828 9.27%)',
        gradient_match_link_won_hover:
          'linear-gradient(90deg, rgba(38, 189, 57, 0.2) 0%, #282828 58.56%)',
        gradient_match_link_defeated:
          'linear-gradient(90deg, rgba(246, 53, 53, 0.2) 0%, #282828 9.27%)',
        gradient_match_link_defeated_hover:
          'linear-gradient(90deg, rgba(246, 53, 53, 0.2) 0%, #282828 58.56%)',
        gradient_match_table:
          'linear-gradient(90deg, rgba(104, 71, 255, 0.3) 0%, rgba(104, 71, 255, 0.3) 100%, #333)',
        gradient_match_table_hover:
          'linear-gradient(0deg, rgba(51, 51, 51, 0.80) 0%, rgba(51, 51, 51, 0.80) 100%, rgba(40, 40, 40, 0.80))',
        gradient_match_table_highlight:
          'linear-gradient(90deg, rgba(104, 71, 255, 0.5) 0%, rgba(104, 71, 255, 0.19) 4.94%, rgba(104, 71, 255, 0) 13.92%, rgba(51, 51, 51, 0.8))',
        gradient_match_table_winner:
          'linear-gradient(90deg, rgba(38, 189, 57, 0.5) 0%, rgba(38, 189, 57, 0.2) 100%)',
        gradient_match_table_loser:
          'linear-gradient(90deg, rgba(246, 53, 53, 0.5) 0%, rgba(246, 53, 53, 0.2) 100%, #333)',
      },
      animation: {
        spin: 'spin 2s linear infinite',
        progress: 'progress linear',
        fade: 'fade 0.2s ease-in-out',
        shake: 'shake 3.5s ease infinite',
        // Radix
        'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade':
          'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        spin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
        progress: {
          '0%': {
            'max-width': '100%',
          },
          '100%': {
            'max-width': '0',
          },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shake: {
          '0%, 20%, 40%': {
            transform: 'rotate(0)',
          },
          '1.5%, 21.5%, 41.5%': {
            transform: 'rotate(-13deg) scale(1.2)',
          },
          '2.5%, 22.5%, 42.5%': {
            transform: 'rotate(13deg) scale(1.2)',
          },
          '4%, 24%, 44%': {
            transform: 'rotate(-13deg) scale(1.2)',
          },
          '5%, 25%, 45%': {
            transform: 'rotate(13deg) scale(1.2)',
          },
          '6.5%, 26.5%, 46.5%': {
            transform: 'rotate(-13deg) scale(1.2)',
          },
          '7.5%, 27.5%, 47.5%': {
            transform: 'rotate(0deg) scale(1)',
          },
          '100%': {
            transform: 'rotate(0)',
          },
        },
        // Radix
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: '0', transform: 'translateX(-2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: '0', transform: 'translateY(-2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: '0', transform: 'translateX(2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // Modal
        'dialog-overlay-show': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'dialog-overlay-hide': {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
        'dialog-content-show': {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
        'dialog-content-hide': {
          from: {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
          to: {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(0.95)',
          },
        },
        // Drawer
        'drawer-content-show-right': {
          from: {
            opacity: '0',
            transform: 'translate(50%, 0%)',
          },
          to: {
            opacity: '1',
            transform: 'translate(0%, 0%)',
          },
        },
        'drawer-content-hide-right': {
          from: {
            opacity: '1',
            transform: 'translate(0%, 0%)',
          },
          to: {
            opacity: '0',
            transform: 'translate(100%, 0%)',
          },
        },
        'drawer-content-show-left': {
          from: {
            opacity: '0',
            transform: 'translate(-50%, 0%)',
          },
          to: {
            opacity: '1',
            transform: 'translate(0%, 0%)',
          },
        },
        'drawer-content-hide-left': {
          from: {
            opacity: '1',
            transform: 'translate(0%, 0%)',
          },
          to: {
            opacity: '0',
            transform: 'translate(-100%, 0%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-radix')],
}
export default config
