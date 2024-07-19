import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logo.svg'

export function Header() {
  return (
    <header className="flex items-center justify-between px-6">
      <Link className="flex items-center gap-1" href="/">
        <Image src={logo} alt="Logo" width={30} height={30} />

        <h1 className="font-montserrat text-3xl font-bold text-white">
          Empreendedor
        </h1>
      </Link>
    </header>
  )
}
