import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logo.svg'

export function Footer() {
  return (
    <footer>
      <nav className="mt-20 flex flex-col items-center gap-10">
        <Link className="flex items-center gap-1" href="/">
          <Image src={logo} alt="Logo" width={30} height={30} />

          <h1 className="font-montserrat text-3xl font-bold text-white">
            Empreendedor
          </h1>
        </Link>

        <p className="text-lg">© 2020 Empreendedor, All right reserved</p>
      </nav>
    </footer>
  )
}
