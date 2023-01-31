import { Text } from '@chakra-ui/react'
import React from 'react'

import { Container } from '@components'
import style from './SidebarItem.module.css'

export default function SidebarItem({ title, meta, Item, data, emptyMsg }) {
  const render = data.map((dataItem, idx) => (
    <li key={idx}>
      <Item {...dataItem} />
    </li>
  ))

  return (
    <Container column className={style.container}>
      {data.length > 0 ? (
        <Container column>
          <ul>{render}</ul>
        </Container>
      ) : (
        <Container align="center" justify="center" className={style}>
          <Text>{emptyMsg}</Text>
        </Container>
      )}
    </Container>
  )
}
