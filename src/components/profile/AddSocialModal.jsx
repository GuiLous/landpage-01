import { Icon, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { CloseIcon, Container, Modal } from '@components'

import { SiDiscord, SiTwitch, SiYoutube } from 'react-icons/si'

import style from './AddSocialModal.module.css'

export default function AddSocialModal({
  isOpen,
  setIsOpen,
  socialsLinked = [],
}) {
  const dispatch = useDispatch()

  const [socialName, setSocialName] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [activeSocialItem, setActiveSocialItem] = useState('')

  const socialIcons = {
    twitch: SiTwitch,
    discord: SiDiscord,
    youtube: SiYoutube,
  }

  const keys = Object.keys(socialIcons)
  const keysLinked = keys.filter((key) => socialsLinked.includes(key))

  const handleCloseModalSupport = () => {
    setIsOpen(false)
    setSocialName('')
    setActiveSocialItem('')
  }

  const handleChange = (event) => {
    const value = event.target.value

    setSocialName(value)
  }

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter' && socialName !== '') {
      console.log('enter')
    }
  }

  const renderRightContent = (item) => {
    if (item === activeSocialItem) {
      return (
        <Container gap={14} align="center" fitContent>
          <Input
            autoFocus
            variant="secondary"
            minW="170px"
            maxH="28px"
            minH="28px"
            fontSize={12}
            value={socialName}
            placeholder="Insira o nome de usuário"
            _focus={{
              border: '1px solid',
              borderColor: 'purple.400',
            }}
            bgColor="gray.1200"
            px="8px"
            onChange={handleChange}
            onKeyDown={handleKeyEnterDown}
          />

          <Text
            lineHeight={1}
            color="gray.300"
            fontSize={12}
            fontWeight="medium"
            as="span"
            transition="all 0.2s ease-in-out"
            cursor="pointer"
            _hover={{ color: 'white' }}
          >
            Enviar
          </Text>
          <Icon
            as={CloseIcon}
            fontSize={10}
            color="white"
            verticalAlign="middle"
            cursor="pointer"
            transition="all 0.2s ease-in-out"
            _hover={{
              color: 'gray.300',
            }}
            onClick={() => setActiveSocialItem('')}
          />
        </Container>
      )
    }

    if (keysLinked.includes(item)) {
      return (
        <Container gap={14} align="center" fitContent>
          <Text
            lineHeight={1}
            color="white"
            fontSize={14}
            fontWeight="medium"
            as="span"
          >
            @nickname
          </Text>
          <Icon
            as={CloseIcon}
            fontSize={10}
            color="white"
            verticalAlign="middle"
            cursor="pointer"
            transition="all 0.2s ease-in-out"
            _hover={{
              color: 'gray.300',
            }}
          />
        </Container>
      )
    }

    return (
      <Container
        align="center"
        justify="center"
        fitContent
        className={style.addBtn}
        onClick={() => setActiveSocialItem(item)}
      >
        <Text
          lineHeight={1}
          color="white"
          fontSize={12}
          fontWeight="medium"
          as="span"
        >
          Vincular
        </Text>
      </Container>
    )
  }

  const renderSocialItems = () => {
    return (
      <Container column>
        {keys.map((item) => (
          <Container
            key={item}
            justify="between"
            align="center"
            className={style.container}
          >
            <Container gap={14} align="center">
              <Icon
                as={socialIcons[item]}
                fontSize={18}
                verticalAlign="middle"
              />

              <Text
                fontSize={14}
                fontWeight="medium"
                color="white"
                textTransform="capitalize"
              >
                {item}
              </Text>
            </Container>

            {renderRightContent(item)}
          </Container>
        ))}
      </Container>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      title="SOCIAL LINKS"
      onClose={handleCloseModalSupport}
      headerMarginBottom={24}
      justifyTitle="start"
    >
      <Container justify="center" align="center" column gap={40}>
        <Text color="white" fontSize={14} textAlign="center">
          Adicione o link de suas redes sociais que ficarão visíveis no seu
          perfil.
        </Text>

        {renderSocialItems()}
      </Container>
    </Modal>
  )
}
