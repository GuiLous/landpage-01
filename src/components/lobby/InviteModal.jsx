import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { Container, Input, InviteListItem, SearchIcon } from '@components'

import React, { useState } from 'react'

export default function InviteModal(props) {
  const user = useSelector((state) => state.user)

  const [inviteModalFilter, setInviteModalFilter] = useState('')

  const onlineFriends = user.account.friends.filter(
    (friend) => friend.is_online
  )

  const friendList = onlineFriends.filter(
    (friend) => friend.lobby.id !== user.account.lobby.id
  )

  const listFiltered = friendList
    .filter(
      (friend) =>
        inviteModalFilter === '' || friend.username.includes(inviteModalFilter)
    )
    .map((friend) => <InviteListItem key={friend.id} {...friend} />)

  const handleInviteModalFilterChange = (event) => {
    setInviteModalFilter(event.target.value)
  }

  return (
    <Modal
      size="3xl"
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Container justify="center" style={{ marginBottom: '40px' }}>
            Convidar
          </Container>
          <Container justify="center">
            <Container style={{ maxWidth: '50%' }}>
              <Input
                onChange={handleInviteModalFilterChange}
                variant="filled"
                leftIcon={<SearchIcon fill="#999" />}
              />
            </Container>
          </Container>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <Container justify="center" column>
            <Container
              style={{ marginBottom: '34px' }}
              justify="center"
              align="center"
              column
              gap={12}
            >
              {friendList.length > 0 ? (
                listFiltered.length > 0 ? (
                  listFiltered
                ) : (
                  <Text>Nenhum amigo com os termos buscados.</Text>
                )
              ) : (
                <Text>Nenhum amigo online agora.</Text>
              )}
            </Container>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
