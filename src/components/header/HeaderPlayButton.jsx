import { Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { Timer } from '@components'
import { useSelector } from 'react-redux'

import style from './HeaderPlayButton.module.css'

export default function HeaderPlayButton() {
  const user = useSelector((state) => state.user)
  const preMatch = useSelector((state) => state.match.preMatch)
  const match = useSelector((state) => state.match.match)

  const lobby = user && user.account.lobby

  return (
    <Link
      className={style.statusLobbyLinkBtn}
      color="gray.200"
      _hover={{
        color: 'gray.200',
      }}
      bgColor={(lobby.queue || match) && 'primary.500'}
      as={RouterLink}
      to={match ? '/' : '/jogar'}
    >
      {!lobby.queue && !match && 'Jogar'}

      {lobby.queue && !match && (
        <>
          <Text>Na fila</Text>
          <Text fontSize={16}>
            <Timer initialTime={lobby.queue_time} stop={preMatch} />
          </Text>
        </>
      )}

      {match && 'Em partida'}
    </Link>
  )
}
