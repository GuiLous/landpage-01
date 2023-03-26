import { Icon, Text } from '@chakra-ui/react'
import { ClipboardIcon, Container } from '@components'
import React, { useEffect, useState } from 'react'
import { BsFillClipboard2CheckFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

import gta_avatar from '@assets/images/gta_avatar.png'
import logo from '@assets/images/logo_type_white.svg'
import style from './Connect.module.css'

export default function Connect(props) {
  const match = useSelector((state) => state.match.match)
  const [copied, setCopied] = useState(false)
  const [copiedTime, setCopiedTime] = useState(0)

  useEffect(() => {
    if (copied) {
      const maxCopiedTime = 3
      const interval = setInterval(() => {
        setCopiedTime(copiedTime + 1)
        if (copiedTime >= maxCopiedTime) {
          clearInterval(interval)
          setCopied(false)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  })

  const handleClipboard = () => {
    navigator.clipboard.writeText(match.server_ip)
    setCopied(true)
    // TODO change when be is ready to send match IP:
    // navigator.clipboard.writeText(match.server_ip)
  }

  return (
    <Container className={style.container} align="end">
      <Container className={style.gtaAvatarWrapper} align="end">
        <Container className={style.gtaAvatar} align="end">
          <img src={gta_avatar} alt="Personagem do GTA V" />
        </Container>
      </Container>

      <Container column>
        <Container column align="end" justify="center" gap={32}>
          <Container className={style.logo} justify="end">
            <img src={logo} alt="ReloadClub" />
          </Container>

          <Container column align="end">
            <Text className={style.title}>É hora do jogo!</Text>
            <Text className={style.helper}>
              Para se conectar, abra o FiveM e insira o IP abaixo na lista de
              servidores.{' '}
              <span style={{ color: '#E4BC00' }}>
                Você tem até 3 minutos para se conectar.
              </span>
            </Text>
          </Container>

          <Container justify="end">
            {copied ? (
              <Container
                className={style.copied}
                align="center"
                justify="center"
                gap={10}
              >
                <Icon w="25px" h="25px" as={BsFillClipboard2CheckFill} />
                <Text>IP Copiado!</Text>
              </Container>
            ) : (
              <Container
                className={style.connectionBox}
                gap={20}
                onClick={handleClipboard}
                align="center"
                justify="center"
              >
                <Container className={style.clipboard} fitContent>
                  <ClipboardIcon fill="#6847FF" />
                </Container>

                <Container fitContent>
                  <Text className={style.ip}>123.123.123.123</Text>
                </Container>
              </Container>
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
