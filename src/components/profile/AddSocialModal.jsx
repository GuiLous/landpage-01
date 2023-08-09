import { Button, Icon, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { SiDiscord, SiTwitch, SiYoutube } from 'react-icons/si'
import { useDispatch } from 'react-redux'

import { ProfilesAPI } from '@api'
import { CloseIcon, Container, Modal } from '@components'
import { StorageService } from '@services'
import { addToast } from '@slices/AppSlice'

import style from './AddSocialModal.module.css'

export default function AddSocialModal({
  isOpen,
  setIsOpen,
  socialsLinked,
  socials,
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

  const keysIcons = Object.keys(socialIcons)

  const handleCloseModalSupport = () => {
    setIsOpen(false)
    setSocialName('')
    setActiveSocialItem('')
  }

  const handleChangeActiveSocialName = (item) => {
    setSocialName('')
    setActiveSocialItem(item)
  }

  const handleChange = (event) => {
    const value = event.target.value

    setSocialName(value)
  }

  const handleKeyEnterDown = (event) => {
    if (event.key === 'Enter') {
      handleUpdateSocials()
    }
  }

  const handleSubmit = async (action, item) => {
    debugger
    if (action === 'update' && socialName === '') return

    setIsFetching(true)
    const token = StorageService.get('token')

    let payload
    let response

    if (action === 'update') {
      payload = {
        social_handles: {
          ...socials,
        },
      }

      payload.social_handles[activeSocialItem] = socialName

      response = await ProfilesAPI.updateSocials(token, payload)
    } else {
      payload = {
        social_handles: {
          ...socials,
        },
      }

      delete payload.social_handles[item]

      response = await ProfilesAPI.updateSocials(token, payload)
    }

    if (response.errorMsg) {
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )

      setIsFetching(false)
      return
    }

    setIsFetching(false)
    setActiveSocialItem('')
    setSocialName('')
  }

  const handleUpdateSocials = () => handleSubmit('update')
  const handleDeleteSocials = (item) => {
    handleSubmit('delete', item)
  }

  const renderRightContent = (item) => {
    if (item === activeSocialItem && !isFetching) {
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
            data-testid={`input-${item}`}
          />

          <Text
            lineHeight={1}
            color="gray.300"
            fontSize={12}
            fontWeight="medium"
            as="span"
            transition="color 0.2s ease-in-out"
            cursor="pointer"
            _hover={{ color: 'white' }}
            onClick={handleUpdateSocials}
            data-testid={`send-${item}`}
          >
            Enviar
          </Text>

          <Icon
            as={CloseIcon}
            fontSize={10}
            color="white"
            verticalAlign="middle"
            cursor="pointer"
            transition="color 0.2s ease-in-out"
            _hover={{
              color: 'gray.300',
            }}
            data-testid={`cancel-${item}`}
            onClick={() => setActiveSocialItem('')}
          />
        </Container>
      )
    }

    if (socialsLinked.includes(item)) {
      return (
        <Container gap={14} align="center" fitContent>
          <Text
            lineHeight={1}
            color="white"
            fontSize={14}
            fontWeight="medium"
            as="span"
          >
            {socials[item]}
          </Text>
          <Icon
            as={CloseIcon}
            fontSize={10}
            color="white"
            verticalAlign="middle"
            cursor="pointer"
            transition="color 0.2s ease-in-out"
            _hover={{
              color: 'gray.300',
            }}
            onClick={() => handleDeleteSocials(item)}
            data-testid={`delete-${item}`}
          />
        </Container>
      )
    }

    return (
      <Button
        minH="28px"
        h="28px"
        fontSize={12}
        fontWeight="medium"
        borderRadius="67px"
        textTransform="capitalize"
        lineHeight={1}
        _disabled={{
          fontSize: 12,
          color: 'gray.400',
          bgColor: 'gray.800',
          cursor: 'not-allowed',
        }}
        onClick={() => handleChangeActiveSocialName(item)}
        isDisabled={isFetching}
        isLoading={item === activeSocialItem && isFetching}
        data-testid={`add-${item}`}
      >
        Vincular
      </Button>
    )
  }

  const renderSocialItems = () => {
    return (
      <Container column>
        {keysIcons.map((item) => (
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
