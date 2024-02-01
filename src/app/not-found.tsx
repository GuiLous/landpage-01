import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { NotFoundMessage, NotFoundRedirectButton } from '@/components/pages'

import { Footer } from '@/components/shared'

const text404 = '/assets/images/404.png'
const errorPage = '/assets/images/error_page.png'
const logo = '/assets/images/logo_type_white.svg'

export default function NotFound() {
  return (
    <main
      className={twMerge(
        'relative h-screen w-screen flex-col',
        'bg-not_found bg-cover bg-no-repeat'
      )}
    >
      <section className="flex-col items-center justify-center gap-[5.625rem]">
        <div className="flex-initial justify-center">
          <Image src={logo} alt="Reload logo" width={200} height={30} />
        </div>

        <div className="flex-initial flex-col items-center justify-center gap-10">
          <Image
            src={text404}
            alt="404"
            className="w-[16%]"
            width={307}
            height={125}
          />
          <Image
            src={errorPage}
            alt="Error page"
            className="w-[16%]"
            width={307}
            height={43}
          />
        </div>

        <div className="flex-initial flex-col items-center justify-center gap-10">
          <NotFoundMessage />

          <NotFoundRedirectButton />
        </div>
      </section>

      <Footer />
    </main>
  )
}
