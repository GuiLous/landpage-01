import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { Button, Footer, Link } from '@/components/shared'

import text404 from '@/assets/images/404.png'
import errorPage from '@/assets/images/error_page.png'
import logo from '@/assets/images/logo_type_white.svg'

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
          <Image src={logo} alt="Reload logo" width={200} />
        </div>

        <div className="flex-initial flex-col items-center justify-center gap-10">
          <Image src={text404} alt="404" className="w-[16%]" />
          <Image src={errorPage} alt="Error page" className="w-[16%]" />
        </div>

        <div className="flex-initial flex-col items-center justify-center gap-10">
          <p className="text-center">
            Ops! Parece que você achou a página de erro 404.
            <br />
            Mas não se preocupe, vamos te guiar até uma página segura.
          </p>

          <Button.Root asChild>
            <Link href="/">
              <Button.Content className="w-60 text-center text-sm font-bold">
                Voltar para o início
              </Button.Content>
            </Link>
          </Button.Root>
        </div>
      </section>

      <Footer />
    </main>
  )
}
