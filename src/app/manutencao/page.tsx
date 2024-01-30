import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { MaintenanceMessage } from '@/components/pages'

import {
  Footer,
  LogoutButtonRedirect,
  VerifyMaintenance,
} from '@/components/shared'

const alert = '/assets/images/alert.png'
const logo = '/assets/images/logo_type_white.svg'

export default function Maintenance() {
  return (
    <main
      className={twMerge(
        'relative h-screen w-screen flex-col',
        'bg-maintenance bg-cover bg-no-repeat'
      )}
    >
      <section className="flex-col items-center justify-center gap-40 pb-10">
        <div className="flex-initial justify-center">
          <Image src={logo} alt="Reload logo" width={200} />
        </div>

        <section className="flex-initial flex-col items-center justify-center gap-[2.75rem]">
          <Image src={alert} alt="Alert" />

          <MaintenanceMessage />

          <LogoutButtonRedirect />
        </section>
      </section>

      <Footer />

      <VerifyMaintenance />
    </main>
  )
}
