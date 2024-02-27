import {
  SiDiscord,
  SiFacebook,
  SiInstagram,
  SiTwitter,
  SiYoutube,
} from 'react-icons/si'
import { twMerge } from 'tailwind-merge'

import {
  DISCORD_LINK,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  TWITTER_LINK,
  YOUTUBE_LINK,
} from '@/constants'

import { Link } from '@/components/shared'

export function SidebarFooter() {
  return (
    <footer
      className={twMerge(
        'items-end px-10 pb-10',
        '3xl:px-8 3xl:pb-8',
        'ultrawide:px-12 ultrawide:pb-12'
      )}
    >
      <nav className={twMerge('flex items-center gap-6 ', 'ultrawide:gap-12 ')}>
        <Link href={INSTAGRAM_LINK} target="_blank" data-testid="instagram">
          <SiInstagram className="ultrawide:text-3xl" />
        </Link>

        <Link href={TWITTER_LINK} target="_blank" data-testid="twitter">
          <SiTwitter className="ultrawide:text-3xl" />
        </Link>

        <Link href={DISCORD_LINK} target="_blank" data-testid="discord">
          <SiDiscord className="ultrawide:text-3xl" />
        </Link>

        <Link href={YOUTUBE_LINK} target="_blank" data-testid="youtube">
          <SiYoutube className="ultrawide:text-3xl" />
        </Link>

        <Link href={FACEBOOK_LINK} target="_blank" data-testid="facebook">
          <SiFacebook className="ultrawide:text-3xl" />
        </Link>
      </nav>
    </footer>
  )
}
