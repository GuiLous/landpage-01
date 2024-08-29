import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { Carousel } from '@/components/pages/home/components/section-04/carousel'

import circles from '@/assets/images/circles.svg'
import graph from '@/assets/images/graph.svg'
import img02 from '@/assets/images/img_02.jpg'

export function Section04() {
  return (
    <section id="section04" className="flex flex-col gap-12">
      <h2 className="px-6 text-center font-poppins text-4xl font-bold leading-snug">
        Sobre Mim <span className="text-yellow-300">Jeanderson Sá</span>
      </h2>

      <div
        className={twMerge(
          'relative flex flex-col gap-12',
          'lg:flex-row lg:items-center lg:justify-center'
        )}
      >
        <div className={twMerge('relative flex-1', 'lg:max-w-96 lg:pl-12')}>
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
            quality={50}
          />
        </div>

        <Carousel />

        <Image
          src={graph}
          alt="Gráfico"
          width={61}
          className="absolute -bottom-10 left-6"
          quality={50}
        />

        <div
          className={twMerge(
            'absolute -top-24 left-0 min-h-[668px] min-w-[350px] -rotate-45 bg-gradient_red blur-3xl',
            'lg:rotate-180 lg:inset-0 lg:min-h-full lg:min-w-full lg:bg-gradient_purple lg:opacity-25'
          )}
        />
      </div>
    </section>
  )
}
