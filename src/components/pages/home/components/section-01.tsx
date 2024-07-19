import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import add from '@/assets/images/add.svg'
import circles from '@/assets/images/circles.svg'
import graph from '@/assets/images/graph.svg'
import img01 from '@/assets/images/img_01.jpg'
import triangles from '@/assets/images/triangles.svg'

export function Section01() {
  return (
    <section id="section01" className="relative flex  flex-col gap-12">
      <div className="flex flex-col gap-12 px-6">
        <h2 className="max-w-64 font-poppins text-5xl font-bold leading-normal">
          Seja um <span className="text-yellow-300">empreendedor</span>{' '}
          Imbatível
        </h2>

        <p className="text-justify text-xl">
          Como empreendedor, você está na linha de frente da inovação. Suas
          ideias têm o poder de mudar vidas, criar empregos e contribuir para a
          sociedade. Mas essa jornada não é fácil. Ela exige resiliência,
          criatividade e uma vontade incessante de aprender e se adaptar.
        </p>

        <button
          className={twMerge(
            'flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-500 shadow-md',
            'transition-colors',
            'active:bg-blue-300',
            'hover:cursor-pointer hover:bg-blue-300'
          )}
          aria-label="ebook"
        >
          <span className="text-lg font-medium">Garanta seu E-BOOK</span>
          <ArrowUpRight />
        </button>
      </div>

      <div className="relative">
        <Image
          src={graph}
          alt="Gráfico"
          width={61}
          className="absolute top-8"
          quality={50}
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
          quality={50}
        />
        <Image
          src={add}
          alt="Mais"
          width={39}
          className="absolute bottom-14 right-0"
          quality={50}
        />
        <Image
          src={img01}
          alt="Pessoa terno"
          width={380}
          height={414}
          priority
          className="h-auto w-full"
        />

        <div className="absolute left-0 top-0 min-h-[568px] min-w-[350px] rotate-45 bg-gradient_red blur-3xl" />
      </div>

      <div className="absolute -top-24 left-0 min-h-[668px] min-w-[350px] -rotate-45 bg-gradient_purple blur-3xl" />
    </section>
  )
}
