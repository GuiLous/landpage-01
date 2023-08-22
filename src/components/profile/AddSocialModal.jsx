import { Button, Icon, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { SiDiscord, SiTwitch, SiYoutube } from 'react-icons/si'
import { useDispatch } from 'react-redux'

import { ProfilesAPI } from '@api'
import { CloseIcon, Container, Modal } from '@components'
import { hasUrlOnText } from '@components/forms/Validators'
import { useProfileDetails } from '@hooks'
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

  const { setProfile } = useProfileDetails()

  const [socialName, setSocialName] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [activeSocialItem, setActiveSocialItem] = useState('')

  const socialHashes = {
    twitch: {
      title: 'Twitch',
      icon: SiTwitch,
      helper: 'Nome do canal',
      placeholder: 'Ex: meucanal',
    },
    discord: {
      title: 'Servidor do Discord',
      icon: SiDiscord,
      helper: 'Hash de convite',
      placeholder: 'Ex: XXyy99ZZ',
    },
    youtube: {
      title: 'Youtube',
      icon: SiYoutube,
      helper: 'Nome do canal',
      placeholder: 'Ex: meucanal',
    },
  }

  const socialKeys = Object.keys(socialHashes)

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

  const handleKeyEnterDown = (event, item) => {
    if (event.key === 'Enter') {
      handleUpdateSocials(item)
    }
  }

  const handleSubmit = async (action, item) => {
    if (hasUrlOnText(socialName)) return

    if (action === 'update' && socialName === '') return

    setIsFetching(true)
    const token = StorageService.get('token')

    let response

    const payload = {
      social_handles: {
        ...socials,
      },
    }

    payload.social_handles[item] = action === 'update' ? socialName : null

    response = await ProfilesAPI.updateSocials(token, payload)

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

    setProfile(response)
    setIsFetching(false)
    setActiveSocialItem('')
    setSocialName('')
  }

  const handleUpdateSocials = (item) => handleSubmit('update', item)
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
            placeholder={socialHashes[item].placeholder}
            _focus={{
              border: '1px solid',
              borderColor: hasUrlOnText(socialName) ? 'red.500' : 'purple.400',
            }}
            bgColor="gray.1200"
            borderColor={hasUrlOnText(socialName) ? 'red.500' : 'gray.700'}
            px="8px"
            onChange={handleChange}
            onKeyDown={(e) => handleKeyEnterDown(e, item)}
            data-testid={`input-${item}`}
          />

          <Text
            lineHeight={1}
            color="gray.300"
            fontSize={12}
            fontWeight="medium"
            as="span"
            transition="color 0.2s ease-in-out"
            cursor={!!socialName && 'pointer'}
            _hover={{ color: !!socialName && 'white' }}
            onClick={() => handleUpdateSocials(item)}
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
        {socialKeys.map((item) => (
          <Container
            key={item}
            justify="between"
            align="center"
            className={style.container}
          >
            <Container gap={14} align="center">
              <Container fitContent>
                <Icon
                  as={socialHashes[item].icon}
                  fontSize={18}
                  verticalAlign="middle"
                />
              </Container>

              <Container column>
                <Text fontSize={14} fontWeight="medium" color="white">
                  {socialHashes[item].title}
                </Text>

                <Text fontSize={12} color="gray.200">
                  {socialHashes[item].helper}
                </Text>
              </Container>
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
      title="REDES SOCIAIS"
      onClose={handleCloseModalSupport}
      headerMarginBottom={24}
      justifyTitle="start"
    >
      <Container justify="center" align="center" column gap={40}>
        <Container column gap={5}>
          <Text color="white" fontSize={14} maxW={600}>
            Adicione suas redes sociais. Elas ficarão visíveis no seu perfil.
          </Text>

          <Text color="gray.300" fontSize={12} maxW={500}>
            Não adicione links nessa área. Coloque apenas o nome do canal
            (handle) ou a hash do convite para um servidor no Discord.
          </Text>
        </Container>

        {renderSocialItems()}
      </Container>
    </Modal>
  )
}
