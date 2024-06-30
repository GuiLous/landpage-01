import { Button } from '@radix-ui/themes'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import add from '@/assets/images/add.svg'
import circles from '@/assets/images/circles.svg'
import graph from '@/assets/images/graph.svg'
import person01 from '@/assets/images/person01.svg'
import triangles from '@/assets/images/triangles.svg'

export function Section01() {
  return (
    <section className="relative flex flex-col gap-12 px-6">
      <h2 className="max-w-64 font-poppins text-5xl font-bold leading-normal">
        Build Your Awesome Platform
      </h2>

      <p>
        Enver studio is a digital studio that offers several services such as
        UI/UX Design to developers, we will provide the best service for those
        of you who use our services.
      </p>

      <Button size="4">
        Nossos serviços
        <ArrowUpRight />
      </Button>

      <div className="relative">
        <Image
          src={graph}
          alt="Gráfico"
          width={61}
          className="absolute top-8"
        />
        <Image
          src={circles}
          alt="Círculos"
          width={35}
          className="absolute right-0"
        />
        <Image
          src={triangles}
          alt="Triângulos"
          width={65}
          className="absolute bottom-0"
        />
        <Image
          src={add}
          alt="Mais"
          width={39}
          className="absolute bottom-14 right-0"
        />
        <Image
          src={person01}
          alt="Pessoa sorrindo"
          width={380}
          height={414}
          priority
          className="h-auto w-auto"
        />

        <div className="absolute left-0 top-0 min-h-[568px] min-w-[350px] rotate-45 bg-gradient_red blur-3xl" />
      </div>

      <div className="absolute -top-24 left-0 min-h-[668px] min-w-[350px] -rotate-45 bg-gradient_purple blur-3xl" />
    </section>
  )
}
