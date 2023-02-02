import React, { useState } from 'react'
import RSC from 'react-scrollbars-custom'

export default function Sidebar({ autoHide, children, ...props }) {
  const [inUse, setInUse] = useState()

  const trackYStyle = {
    style: autoHide && {
      opacity: inUse ? 1 : 0,
      transition: 'all 100ms linear',
      right: 5,
    },
  }

  const trackXStyle = {
    style: autoHide && {
      opacity: inUse ? 1 : 0,
      transition: 'all 100ms linear',
      bottom: 5,
    },
  }

  const wrapperStyle = {
    style: {
      width: '100%',
    },
  }

  return (
    <RSC
      trackXProps={trackXStyle}
      trackYProps={trackYStyle}
      wrapperProps={wrapperStyle}
      onMouseEnter={autoHide && (() => setInUse(true))}
      onMouseLeave={autoHide && (() => setInUse(false))}
      {...props}
    >
      {children}
    </RSC>
  )
}
