import Image from 'next/image'
import Link from 'next/link'

const logo = '/assets/images/logo_type_white.svg'

export function FooterLogo() {
  return (
    <div className="xl:max-w-fit">
      <Link href="/" prefetch={false}>
        <Image
          src={logo}
          alt="Reload"
          data-testid="logo"
          className="w-[170px]"
        />
      </Link>
    </div>
  )
}
