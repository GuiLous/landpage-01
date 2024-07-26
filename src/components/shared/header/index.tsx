import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import logo from '@/assets/images/logo.svg'

export function Header() {
  return (
    <header
      className={twMerge(
        'flex items-center justify-between px-6 pt-10',
        'lg:px-32'
      )}
    >
      <Link className={twMerge('flex items-center gap-1', 'lg:gap-4')} href="/">
        <div className={twMerge('relative w-8 h-8', 'lg:w-14 lg:h-14')}>
          <Image src={logo} alt="Logo" fill />
        </div>

        <h1
          className={twMerge(
            'font-montserrat text-3xl font-bold text-white',
            'lg:text-4xl'
          )}
        >
          Empreendedor
        </h1>
      </Link>
    </header>
  )
}
