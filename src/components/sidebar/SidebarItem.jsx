import React from 'react'

import { Container } from '@components'
import style from './SidebarItem.module.css'

export default function SidebarItem({ Item, data }) {
  const render = data.map((dataItem, idx) => <Item key={idx} {...dataItem} />)

  return (
    <Container column className={style.container}>
      <Container column>{render}</Container>
    </Container>
  )
}
