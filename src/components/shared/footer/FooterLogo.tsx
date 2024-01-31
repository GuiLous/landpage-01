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
          width={170}
          height={25}
        />
      </Link>
    </div>
  )
}
