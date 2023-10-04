import Image from 'next/image'

import { MaintenanceLogoutButton } from '@/components/pages'

import { Footer } from '@/components/shared'

import alert from '@/assets/images/alert.png'
import logo from '@/assets/images/logo_type_white.svg'

export default function Maintenance() {
  return (
    <main className="relative h-screen w-screen flex-col bg-maintenance bg-cover bg-no-repeat">
      <section className="flex-col items-center justify-center gap-40 pb-10">
        <div className="flex-initial justify-center">
          <Image src={logo} alt="Reload logo" width={200} />
        </div>

        <section className="flex-initial flex-col items-center justify-center gap-[2.75rem]">
          <Image src={alert} alt="Alert" />

          <p className="max-w-[600px] text-center">
            Calmô meu cria, a gente deu um pause pra ajustar umas coisas, mas já
            voltamos. Fica tranquilo que assim que terminar por aqui, a gente te
            libera no automático.
          </p>

          <MaintenanceLogoutButton />
        </section>
      </section>

      <Footer />
    </main>
  )
}
