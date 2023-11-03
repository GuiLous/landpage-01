import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import logo from '@/assets/images/logo_type_white.svg'

export function ConnectLogo() {
  return (
    <div className={twMerge('justify-end max-w-[455px]', '3xl:max-w-[400px]')}>
      <Image src={logo} alt="ReloadClub logo" />
    </div>
  )
}
