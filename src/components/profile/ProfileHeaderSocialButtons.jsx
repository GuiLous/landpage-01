import { Icon, Link, Tooltip } from '@chakra-ui/react'
import { SiDiscord, SiSteam, SiTwitch, SiYoutube } from 'react-icons/si'

import { Container } from '@components'

export default function ProfileHeaderSocialButtons({ socials }) {
  const socialIcons = {
    steam: SiSteam,
    discord: SiDiscord,
    twitch: SiTwitch,
    youtube: SiYoutube,
  }

  return (
    <Container gap={14} fitContent>
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
            />
          </Link>
        </Tooltip>
      ))}
    </Container>
  )
}
