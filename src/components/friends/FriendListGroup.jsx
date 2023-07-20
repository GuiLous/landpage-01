import { Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import {
  ArrowDownIcon,
  Container,
  FriendListGroupItem,
  InviteListGroupItem,
} from '@components'

import style from './FriendListGroup.module.css'

export default function FriendListGroup({
  title,
  items = [],
  invites = [],
  collapse = true,
  open = false,
  showHeader = true,
}) {
  const [isOpen, setIsOpen] = useState()
  const [filteredItems, setFilteredItems] = useState([])

  const handleCollapse = () => {
    if (!collapse || items.length <= 0) return
    setIsOpen(!isOpen)
  }

  const renderItemsLength = () => {
    if (items.length < 10 && items.length > 0) return `(0${items.length})`
    else return `(${items.length})`
  }

  function filterItems() {
    return items.filter(
      (item) =>
        !invites.some((invite) => item.user_id === invite.from_player.user_id)
    )
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

  useEffect(() => {
    if (items.length === 0) {
      setIsOpen(false)
    }
  }, [items])

  useEffect(() => {
    const itemsWithoutInvite = filterItems()
    setFilteredItems(itemsWithoutInvite)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  return (
    <Container
      className={[
        style.container,
        isOpen && style.open,
        showHeader && style.addBorder,
      ].join(' ')}
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
          <Text
            fontSize={12}
            color={isOpen ? 'white' : 'gray.300'}
            fontWeight={isOpen ? 'medium' : 'regular'}
          >
            {title} {renderItemsLength()}
          </Text>
        </Container>

        {collapse && items.length > 0 && (
          <Container justify="end" testID="arrow-collapse">
            <Icon
              as={ArrowDownIcon}
              fill="white"
              opacity={isOpen && 1}
              fontSize={12}
              className={style.arrowIcon}
            />
          </Container>
        )}
      </Container>

      {invites.length > 0 && isOpen && (
        <Container className={style.list} column>
          {invites.map((invite) => (
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

      {filteredItems.length > 0 && isOpen && (
        <Container className={style.list} column>
          {filteredItems.map((item) => (
            <FriendListGroupItem
              key={item.user_id}
              {...item}
              avatar={item.avatar.medium}
            />
          ))}
        </Container>
      )}
    </Container>
  )
}
