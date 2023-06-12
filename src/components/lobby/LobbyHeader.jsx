import { Icon, Switch, Text } from '@chakra-ui/react'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import { Container } from '@components'
import { HttpService, StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import React from 'react'

import style from './LobbyHeader.module.css'

export default function LobbyHeader({ lobby }) {
  const dispatch = useDispatch()

  const handleToggleVisibilty = async () => {
    const token = StorageService.get('token')
    const endpoint = lobby.is_public ? 'set-private' : 'set-public'
    let response

    response = await HttpService.patch(
      `mm/lobby/${lobby.id}/${endpoint}/`,
      token
    )
    if (response.errorMsg) {
      dispatch(
        addToast({
          title: 'Algo saiu errado...',
          content: response.errorMsg,
          variant: 'error',
        })
      )
    }
  }

  return (
    <Container fitContent align="center">
      <Container className={style.header} column>
        <Container style={{ fontSize: 24 }}>Selecione um</Container>
        <Container
          style={{ fontSize: 32, fontWeight: 'bold', marginTop: '-8px' }}
        >
          modo de jogo
        </Container>
      </Container>

      {lobby.max_players === 5 && (
        <Container className={style.groupType} gap={14} fitContent>
          <Container style={{ whiteSpace: 'nowrap', minWidth: '106px' }}>
            <Icon
              style={{
                fontSize: '22px',
                top: '-1px',
                opacity: lobby.is_public ? '1' : '.7',
                position: 'relative',
                marginRight: '8px',
              }}
              as={lobby.is_public ? AiFillUnlock : AiFillLock}
            />
            <Text
              style={{
                width: '106px',
                opacity: lobby.is_public ? '1' : '.7',
              }}
            >
              Grupo {lobby.is_public ? 'aberto' : 'fechado'}
            </Text>
          </Container>
          <Container fitContent>
            <Switch
              id="groupType"
              defaultChecked={lobby.is_public}
              onChange={handleToggleVisibilty}
            />
          </Container>
        </Container>
      )}
    </Container>
  )
}
