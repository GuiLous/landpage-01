import { Button } from '@radix-ui/themes'
import Image from 'next/image'

import add from '@/assets/images/add.svg'
import circles from '@/assets/images/circles.svg'

export function Section05() {
  return (
    <section className="relative mt-20 flex flex-col gap-12 px-6">
      <h2 className="font-poppins text-4xl font-bold leading-normal">
        Contact us for the service you want to use
      </h2>

      <Button size="4">Entre em contato</Button>

      <Image
        src={add}
        alt="Mais"
        width={39}
        className="absolute -top-20 right-6"
      />

      <Image
        src={circles}
        alt="Círculos"
        width={35}
        className="absolute -bottom-16 left-6"
      />
    </section>
  )
}
