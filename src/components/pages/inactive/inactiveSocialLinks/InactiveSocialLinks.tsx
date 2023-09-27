import { SiDiscord, SiFacebook, SiInstagram, SiTwitter } from 'react-icons/si'

import { discordLink, facebookLink, instagramLink, twitterLink } from '@/utils'

import { Link } from '@/components/shared'

export function InactiveSocialLinks() {
  return (
    <nav className="mt-5 flex items-center justify-center gap-7 text-2xl">
      <Link href={instagramLink} target="_blank" data-testid="instagram">
        <SiInstagram />
      </Link>

      <Link href={twitterLink} target="_blank" data-testid="twitter">
        <SiTwitter />
      </Link>

      <Link href={discordLink} target="_blank" data-testid="discord">
        <SiDiscord />
      </Link>

      <Link href={facebookLink} target="_blank" data-testid="facebook">
        <SiFacebook />
      </Link>
    </nav>
  )
}
