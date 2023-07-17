import { Box, Icon, Image, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import gta_avatar from '@assets/images/gta_avatar.png'
import loadingGif from '@assets/images/loading.gif'
import logo from '@assets/images/logo_type_white.svg'

import { ClipboardIcon, Container, Timer } from '@components'
import { usePersistentTimer } from '@hooks'

import style from './Connect.module.css'

const COUNTDOWN_TIME = 3 * 60 // 3 minutes in seconds
const TIMER_NAME = 'matchConnectTimer'

export default function Connect() {
  const match = useSelector((state) => state.match)

  const navigate = useNavigate()

  const [copied, setCopied] = useState(false)
  const [copiedTime, setCopiedTime] = useState(0)

  const timeLeft = usePersistentTimer(COUNTDOWN_TIME, TIMER_NAME)

  const handleClipboard = () => {
    navigator.clipboard.writeText(match.server_ip)
    setCopied(match.server_ip)
  }

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

  useEffect(() => {
    if (!match) {
      navigate('/jogar')
    }
  }, [match, navigate])

  useEffect(() => {
    if (timeLeft === 0) navigate(`/partidas/${match.id}`)
  }, [timeLeft, match?.id, navigate])

  return (
    <Container className={style.container} align="end">
      <Container className={style.gtaAvatarWrapper} align="end">
        <Container className={style.gtaAvatar} align="end">
          <img src={gta_avatar} alt="Personagem do GTA V" />
        </Container>
      </Container>

      <Container column style={{ marginBottom: '110px' }}>
        <Container column align="end" justify="center" gap={80}>
          <Container className={style.logo} justify="end">
            <img src={logo} alt="ReloadClub" />
          </Container>

          <Container column align="end" gap={18}>
            <Text className={style.title}>É hora do jogo!</Text>
            <Text className={style.helper}>
              Para se conectar, abra o FiveM e insira o IP abaixo na lista{' '}
              <br /> de servidores.{' '}
              <Text color="cyan.400" as="span" fontWeight="medium">
                Você tem até 3 minutos para se conectar.
              </Text>
            </Text>

            <Container justify="end">
              <Container
                className={style.connectionBox}
                align="center"
                gap={32}
                onClick={handleClipboard}
              >
                <Text
                  className={style.ip}
                  color={copied ? 'purple.400' : 'white'}
                >
                  IP: {match && match.server_ip}
                </Text>

                <Tooltip
                  label="Copiado!"
                  aria-label="clip icon"
                  placement="right-start"
                  isOpen={copied}
                  bg="gray.1000"
                  color="white"
                >
                  <Box className={style.iconClip}>
                    <Icon
                      as={ClipboardIcon}
                      color={copied ? 'purple.400' : 'white'}
                    />
                  </Box>
                </Tooltip>
              </Container>
            </Container>
          </Container>

          <Container justify="end" gap={14}>
            <Text fontSize={24} color="white" fontWeight="semibold">
              <Timer initialTime={timeLeft || 1} reverse />
            </Text>

            <Image src={loadingGif} alt="loading" width="48px" />
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
