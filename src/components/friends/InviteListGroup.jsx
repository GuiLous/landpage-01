import { Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ArrowDownIcon, Container, InviteListGroupItem } from '@components'
import style from './InviteListGroup.module.css'

export default function InviteListGroup({
  title,
  items,
  collapse = true,
  open = false,
  unread = false,
}) {
  useEffect(() => {
    if (collapse) setIsOpen(open)
    else setIsOpen(true)
  }, [open, collapse])

  useEffect(() => {
    setIsUnread(unread)
  }, [unread])

  const [isOpen, setIsOpen] = useState()
  const [isUnread, setIsUnread] = useState()

  const handleCollapse = () => {
    if (!collapse || items.length <= 0) return
    setIsOpen(!isOpen)
    setIsUnread(false)
  }

  const renderItemsLength = () => {
    if (items.length < 10 && items.length > 0) return `(0${items.length})`
    else return `(${items.length})`
  }

  return (
    <Container
      className={[
        style.container,
        isOpen && style.open,
        isUnread && style.unread,
      ].join(' ')}
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

      {items.length > 0 && isOpen && (
        <Container className={style.list} column>
          {items.map((invite) => (
            <InviteListGroupItem
              key={invite.id}
              invite_id={invite.id}
              avatar={invite.from_player.avatar.medium}
              status={invite.from_player.status}
              username={invite.from_player.username}
            />
          ))}
        </Container>
      )}
    </Container>
  )
}
