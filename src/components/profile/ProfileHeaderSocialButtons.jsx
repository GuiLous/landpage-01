import { Box, Icon, Link, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { SiDiscord, SiSteam, SiTwitch, SiYoutube } from 'react-icons/si'

import { AddSocialModal, Container } from '@components'

import style from './ProfileHeaderSocialButtons.module.css'

export default function ProfileHeaderSocialButtons({ socials, isUserLogged }) {
  const [openAddSocialModal, setOpenAddSocialModal] = useState(false)

  const socialLinkedKeys = Object.keys(socials).filter(
    (key) => socials[key] !== null
  )

  const socialIcons = {
    steam: SiSteam,
    discord: SiDiscord,
    twitch: SiTwitch,
    youtube: SiYoutube,
  }

  const socialsLinksPrefix = {
    steam: 'https://steamcommunity.com/profiles/',
    discord: 'https://discord.gg/',
    twitch: 'https://www.twitch.tv/',
    youtube: 'https://www.youtube.com/',
  }

  const handleOpenModalSupport = () => {
    setOpenAddSocialModal(true)
  }

  return (
    <Container gap={14} fitContent align="center">
      {socialLinkedKeys?.map((item) => (
        <Tooltip
          key={item}
          label={`Visitar perfil ${item}`}
          aria-label={`Visitar perfil ${item}`}
          bg="rgba(51, 51, 51, 0.70)"
          padding="12px 10px"
          fontSize={12}
        >
          <Link
            href={socialsLinksPrefix[item] + socials[item]}
            isExternal
            color="white"
          >
            <Icon
              as={socialIcons[item]}
              fontSize={18}
              verticalAlign="middle"
              data-testid={item}
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
        socialsLinked={socialLinkedKeys}
        socials={socials}
      />
    </Container>
  )
}
