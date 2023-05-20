import { Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import {
  ArrowDownIcon,
  Container,
  FriendListGroupItem,
  Scrollbars,
} from '@components'

import style from './FriendListGroup.module.css'

export default function FriendListGroup({
  title,
  items,
  collapse = true,
  open = false,
}) {
  useEffect(() => {
    if (collapse) setIsOpen(open)
    else setIsOpen(true)
  }, [open, collapse])

  const [isOpen, setIsOpen] = useState()

  const handleCollapse = () => {
    if (!collapse) return
    setIsOpen(!isOpen)
  }

  const renderItemsLength = () => {
    if (items.length < 10 && items.length > 0) return `(0${items.length})`
    else return `(${items.length})`
  }

  return (
    <Container
      className={[style.container, isOpen && style.open].join(' ')}
      column
      testID="container"
    >
      <Container
        className={[style.header, items.length <= 0 && style.disabled].join(
          ' '
        )}
        align="center"
        fitContent
        testID="header"
        onClick={handleCollapse}
      >
        <Container>
          <Text fontSize={14}>
            {title} {renderItemsLength()}
          </Text>
        </Container>

        {collapse && items.length > 0 && (
          <Container justify="end" testID="arrow-collapse">
            <Icon
              as={ArrowDownIcon}
              fill="white"
              fontSize={12}
              className={style.arrowIcon}
            />
          </Container>
        )}
      </Container>

      {items.length > 0 && (
        <Container className={style.list} column>
          <Scrollbars style={{ height: '100%' }} autoHide>
            {items.map((item) => (
              <FriendListGroupItem {...item} key={item.id} />
            ))}
          </Scrollbars>
        </Container>
      )}
    </Container>
  )
}
