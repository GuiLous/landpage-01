import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { Link } from '@/components/shared'

import logoFull from '@/assets/images/logo_symbol_full.svg'

export function SidebarLogo() {
  return (
    <div className="flex-initial flex-col">
      <div className={twMerge('px-7 pb-0 pt-10', '3xl:px-6 3xl:pt-8')}>
        <Link href="/jogar" id="step-sidebar01">
          <Image
            priority
            src={logoFull}
            width={176}
            data-testid="logo-full"
            alt="Reload logo"
          />
        </Link>
      </div>
    </div>
  )
}
