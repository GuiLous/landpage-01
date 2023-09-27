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

import { Link } from '../link/Link'

export function SidebarFooter() {
  return (
    <footer className="items-end px-10 pb-10 3xl:px-8 3xl:pb-8">
      <nav className="flex items-center gap-6 text-lg 3xl:text-base">
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
    </footer>
  )
}
