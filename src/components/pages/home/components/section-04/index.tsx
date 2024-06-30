import Image from 'next/image'

import { Carousel } from '@/components/pages/home/components/section-04/carousel'

import circles from '@/assets/images/circles.svg'
import graph from '@/assets/images/graph.svg'

export function Section04() {
  return (
    <section id="section04" className="relative flex flex-col gap-12">
      <div className="relative px-6">
        <h2 className="font-poppins text-4xl font-bold leading-snug">
          Our Awesome Portofolio
        </h2>

        <Image
          src={circles}
          alt="Círculos"
          width={35}
          className="absolute bottom-0 right-6"
        />
      </div>

      <Carousel />

      <Image
        src={graph}
        alt="Gráfico"
        width={61}
        className="absolute -bottom-10 left-6"
      />

      <div className="bg-gradient_red absolute -top-24 left-0 min-h-[668px] min-w-[350px] -rotate-45 blur-3xl" />
    </section>
  )
}
