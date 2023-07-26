import { Icon } from '@chakra-ui/react'
import React from 'react'

export default function PlusIcon(props) {
  return (
    <Icon viewBox="0 0 28 28" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 0C14.5523 0 15 0.447715 15 1V13L27 13C27.5523 13 28 13.4477 28 14C28 14.5523 27.5523 15 27 15L15 15L15 27C15 27.5523 14.5523 28 14 28C13.4477 28 13 27.5523 13 27L13 15H1C0.447715 15 0 14.5523 0 14C0 13.4477 0.447715 13 1 13H13V1C13 0.447715 13.4477 0 14 0Z"
        fill="currentColor"
      />
    </Icon>
  )
}
