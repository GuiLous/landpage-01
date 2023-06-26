import { Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ArrowDownIcon, Container, FriendListGroupItem } from '@components'

import style from './FriendListGroup.module.css'

export default function FriendListGroup({
  title,
  items,
  collapse = true,
  open = false,
  showHeader = true,
}) {
  const [isOpen, setIsOpen] = useState()

  const handleCollapse = () => {
    if (!collapse || items.length <= 0) return
    setIsOpen(!isOpen)
  }

  const renderItemsLength = () => {
    if (items.length < 10 && items.length > 0) return `(0${items.length})`
    else return `(${items.length})`
  }

  useEffect(() => {
    if (collapse) setIsOpen(open)
    else setIsOpen(true)
  }, [open, collapse])

  useEffect(() => {
    if (!showHeader) {
      setIsOpen(true)
    }
  }, [showHeader])

  return (
    <Container
      className={[style.container, isOpen && style.open].join(' ')}
      column
      testID="container"
    >
      <Container
        className={[
          style.header,
          items.length <= 0 && style.disabled,
          !showHeader && style.hideHeader,
        ].join(' ')}
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

      {items.length > 0 && isOpen && (
        <Container className={style.list} column>
          {items.map((item) => (
            <FriendListGroupItem {...item} key={item.user_id} />
          ))}
        </Container>
      )}
    </Container>
  )
}
