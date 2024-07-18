import Image from 'next/image'

import { Carousel } from '@/components/pages/home/components/section-04/carousel'

import circles from '@/assets/images/circles.svg'
import graph from '@/assets/images/graph.svg'
import img02 from '@/assets/images/img_02.jpg'

export function Section04() {
  return (
    <section id="section04" className="relative flex flex-col gap-12">
      <div className="relative">
        <h2 className="text-center font-poppins text-4xl font-bold leading-snug">
          Sobre min <span className="text-yellow-300">Jeanderson Sá</span>
        </h2>

        <Image
          src={img02}
          alt="Pessoa de terno"
          width={380}
          height={414}
          priority
          className="h-auto w-full"
        />

        <Image
          src={circles}
          alt="Círculos"
          width={35}
          className="absolute bottom-0 right-2"
        />
      </div>

      <Carousel />

      <Image
        src={graph}
        alt="Gráfico"
        width={61}
        className="absolute -bottom-10 left-6"
      />

      <div className="absolute -top-24 left-0 min-h-[668px] min-w-[350px] -rotate-45 bg-gradient_red blur-3xl" />
    </section>
  )
}
