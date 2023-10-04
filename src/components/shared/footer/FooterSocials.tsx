import {
  SiDiscord,
  SiFacebook,
  SiInstagram,
  SiTwitter,
  SiYoutube,
} from 'react-icons/si'

import {
  DISCORD_LINK,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  TWITTER_LINK,
  YOUTUBE_LINK,
} from '@/constants'

import { Link } from '@/components/shared'

export function FooterSocials() {
  return (
    <nav className="mb-auto flex w-full flex-1 justify-end gap-6 text-[1.375rem] xl:max-w-fit">
      <Link href={INSTAGRAM_LINK} target="_blank" data-testid="instagram">
        <SiInstagram />
      </Link>

      <Link href={TWITTER_LINK} target="_blank" data-testid="twitter">
        <SiTwitter />
      </Link>

      <Link href={DISCORD_LINK} target="_blank" data-testid="discord">
        <SiDiscord />
      </Link>

      <Link href={YOUTUBE_LINK} target="_blank" data-testid="youtube">
        <SiYoutube />
      </Link>

      <Link href={FACEBOOK_LINK} target="_blank" data-testid="facebook">
        <SiFacebook />
      </Link>
    </nav>
  )
}
