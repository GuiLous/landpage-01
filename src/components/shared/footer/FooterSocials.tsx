import {
  SiDiscord,
  SiFacebook,
  SiInstagram,
  SiTwitter,
  SiYoutube,
} from 'react-icons/si'

import {
  discordLink,
  facebookLink,
  instagramLink,
  twitterLink,
  youtubeLink,
} from '@/utils'

import { Link } from '@/components/shared'

export function FooterSocials() {
  return (
    <nav className="mb-auto flex w-full flex-1 justify-end gap-6 text-[1.375rem] xl:max-w-fit">
      <Link href={instagramLink} data-testid="instagram">
        <SiInstagram />
      </Link>

      <Link href={twitterLink} data-testid="twitter">
        <SiTwitter />
      </Link>

      <Link href={discordLink} data-testid="discord">
        <SiDiscord />
      </Link>

      <Link href={youtubeLink} data-testid="youtube">
        <SiYoutube />
      </Link>

      <Link href={facebookLink} data-testid="facebook">
        <SiFacebook />
      </Link>
    </nav>
  )
}
