
import { Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { Timer } from '@components'
import { useSelector } from 'react-redux'

import style from './LinkButton.module.css'

export default function LinkButton() {
  const user = useSelector((state) => state.user)
  const preMatch = useSelector((state) => state.match.preMatch)

  const lobby = user && user.account.lobby

  return (
    <Link
      className={style.statusLobbyLinkBtn}
      color="gray.200"
      _hover={{
        color: 'gray.200',
      }}
      as={RouterLink}
      to="/jogar"
    >
      {!lobby.queue && 'Jogar'}
      {lobby.queue && (
        <Timer initialTime={lobby.queue_time} stop={preMatch} />
      )}
    </Link>
  )
}
