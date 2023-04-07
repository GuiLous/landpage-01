import React from 'react'

import { Container } from '@components'
import style from './SidebarItem.module.css'

export default function SidebarItem(props) {
  const render = props.data.map((dataItem, idx) => (
    <props.Item key={idx} {...dataItem} {...props} />
  ))

  return (
    <Container column className={style.container}>
      <Container column>{render}</Container>
    </Container>
  )
}
