import { Link, useToast } from '@chakra-ui/react'
import React from 'react'

import { HttpService, StorageService } from '@services'
import { useSelector } from 'react-redux'
import style from './FriendListUser.module.css'

export default function FriendListUser(props) {
  const user = useSelector((state) => state.user)
  const toast = useToast()

  const handleInvite = async () => {
    const token = StorageService.get('token')

    const response = await HttpService.post(
      `mm/lobby/${user.account.lobby.id}/invite-player/${props.id}/`,
      token
    )

    if (response.errorMsg) {
      toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
        isClosable: true,
        position: 'bottom-right',
        duration: 6000,
      })
    }
  }

  return (
    <div className={style.container}>
      <p>{props.username}</p>
      <Link onClick={handleInvite}>Convidar</Link>
    </div>
  )
}
