import { Link } from '@chakra-ui/react'
import React from 'react'

import { Container } from '@components'
import style from './SidebarItem.module.css'

export default function SidebarItem({ title, meta, Item, data }) {
  const render = data.map((dataItem, idx) => (
    <li style={{ margin: '10px 0' }} key={idx}>
      <Item {...dataItem} />
      <Link variant={'inline'}>Convidar</Link>
    </li>
  ))

  return (
    <Container column className={style.container}>
      <Container justify="between">
        <p className={style.title}>{title}</p>
        <p className={style.meta}>{meta}</p>
      </Container>

      <Container column>
        <ul>{render}</ul>
      </Container>
    </Container>
  )
}
