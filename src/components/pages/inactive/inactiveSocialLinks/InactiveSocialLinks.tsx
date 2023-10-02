import { SiDiscord, SiFacebook, SiInstagram, SiTwitter } from 'react-icons/si'

import {
  DISCORD_LINK,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  TWITTER_LINK,
} from '@/constants'

import { Link } from '@/components/shared'

export function InactiveSocialLinks() {
  return (
    <nav className="mt-5 flex items-center justify-center gap-7 text-2xl">
      <Link href={INSTAGRAM_LINK} target="_blank" data-testid="instagram">
        <SiInstagram />
      </Link>

      <Link href={TWITTER_LINK} target="_blank" data-testid="twitter">
        <SiTwitter />
      </Link>

      <Link href={DISCORD_LINK} target="_blank" data-testid="discord">
        <SiDiscord />
      </Link>

      <Link href={FACEBOOK_LINK} target="_blank" data-testid="facebook">
        <SiFacebook />
      </Link>
    </nav>
  )
}
