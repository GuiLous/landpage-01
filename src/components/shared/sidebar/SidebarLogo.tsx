import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { Link } from '@/components/shared'

const logoFull = '/assets/images/logo_symbol_full.svg'

export function SidebarLogo() {
  return (
    <div className="flex-initial flex-col">
      <div
        className={twMerge(
          'px-7 pb-0 pt-10',
          '3xl:px-6 3xl:pt-8',
          'ultrawide:px-9 ultrawide:pt-12'
        )}
      >
        <Link href="/jogar" id="step-sidebar01">
          <div
            className={twMerge(
              'relative flex-initial w-[176px] h-7',
              'ultrawide:w-[255px] ultrawide:h-10'
            )}
          >
            <Image
              priority
              src={logoFull}
              fill
              quality={50}
              data-testid="logo-full"
              alt="Reload logo"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
