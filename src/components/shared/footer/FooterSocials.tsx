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
      <Link href={instagramLink} target="_blank" data-testid="instagram">
        <SiInstagram />
      </Link>

      <Link href={twitterLink} target="_blank" data-testid="twitter">
        <SiTwitter />
      </Link>

      <Link href={discordLink} target="_blank" data-testid="discord">
        <SiDiscord />
      </Link>

      <Link href={youtubeLink} target="_blank" data-testid="youtube">
        <SiYoutube />
      </Link>

      <Link href={facebookLink} target="_blank" data-testid="facebook">
        <SiFacebook />
      </Link>
    </nav>
  )
}
