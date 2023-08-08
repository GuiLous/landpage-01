import { Box, Icon, Link, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { SiDiscord, SiSteam, SiTwitch, SiYoutube } from 'react-icons/si'

import { AddSocialModal, Container } from '@components'

import style from './ProfileHeaderSocialButtons.module.css'

export default function ProfileHeaderSocialButtons({ socials, isUserLogged }) {
  const [openAddSocialModal, setOpenAddSocialModal] = useState(false)

  const socialIcons = {
    steam: SiSteam,
    discord: SiDiscord,
    twitch: SiTwitch,
    youtube: SiYoutube,
  }

  const handleOpenModalSupport = () => {
    setOpenAddSocialModal(true)
  }

  return (
    <Container gap={14} fitContent align="center">
      {socials?.map((social) => (
        <Tooltip
          key={social.name}
          label={`Visitar perfil ${social.name}`}
          aria-label={`Visitar perfil ${social.name}`}
          bg="rgba(51, 51, 51, 0.70)"
          padding="12px 10px"
          fontSize={12}
        >
          <Link href={social.url} isExternal color="white">
            <Icon
              as={socialIcons[social.name]}
              fontSize={18}
              verticalAlign="middle"
              data-testid={social.name}
            />
          </Link>
        </Tooltip>
      ))}

      {isUserLogged && (
        <Tooltip
          label="Adicionar rede social"
          aria-label="Adicionar rede social"
          bg="rgba(51, 51, 51, 0.70)"
          padding="12px 10px"
          fontSize={12}
        >
          <Box>
            <Container
              align="center"
              justify="center"
              fitContent
              className={style.addSocialBtn}
              onClick={handleOpenModalSupport}
            >
              +
            </Container>
          </Box>
        </Tooltip>
      )}

      <AddSocialModal
        isOpen={openAddSocialModal}
        setIsOpen={setOpenAddSocialModal}
        socialsLinked={[]}
      />
    </Container>
  )
}
