import { Icon } from '@chakra-ui/react'
import React from 'react'

export default function BellCircleIcon(props) {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path
        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
        fill="currentColor"
      />
      <path
        d="M10.0008 16C10.7259 16 11.3192 15.4462 11.3192 14.7692H8.68246C8.68246 15.4462 9.26913 16 10.0008 16ZM13.9559 12.3077V9.23077C13.9559 7.34154 12.8748 5.76 10.9896 5.34154V4.92308C10.9896 4.41231 10.5479 4 10.0008 4C9.4537 4 9.01205 4.41231 9.01205 4.92308V5.34154C7.12022 5.76 6.04577 7.33538 6.04577 9.23077V12.3077L5.19543 13.1015C4.78015 13.4892 5.07019 14.1538 5.65685 14.1538H14.3382C14.9248 14.1538 15.2215 13.4892 14.8062 13.1015L13.9559 12.3077Z"
        fill={'#222222'}
      />
    </Icon>
  )
}
