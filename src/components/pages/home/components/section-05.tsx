import { Button } from '@radix-ui/themes'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import add from '@/assets/images/add.svg'
import circles from '@/assets/images/circles.svg'

export function Section05() {
  return (
    <section
      id="section05"
      className="relative mt-20 flex flex-col gap-12 px-6"
    >
      <h2 className="text-center font-poppins text-4xl font-bold leading-normal">
        Aprenda manter e cultivar uma mentalidade de sucesso como empreendedor{' '}
        <span className="text-yellow-300 ">imbatível</span>
      </h2>

      <Button size="4">
        Garanta seu E-book
        <ArrowUpRight />
      </Button>

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

      <div className="absolute -top-24 left-0 min-h-[668px] min-w-[350px] rotate-45 bg-gradient_red blur-3xl" />
    </section>
  )
}
