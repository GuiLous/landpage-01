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
    <section
      id="section01"
      className={twMerge(
        'relative flex flex-col gap-12',
        'lg:flex-row lg:gap-8 lg:justify-between lg:pr-32'
      )}
    >
      <div className={twMerge('flex flex-col gap-12 px-6', 'lg:pl-32 lg:pr-0')}>
        <h2
          className={twMerge(
            'max-w-64 font-poppins text-5xl font-bold leading-normal',
            'lg:text-6xl lg:max-w-2xl'
          )}
        >
          Seja Um <span className="text-yellow-300">Empreendedor</span>{' '}
          Imbatível
        </h2>

        <p
          className={twMerge(
            'text-justify text-xl font-semibold',
            'lg:max-w-lg lg:leading-loose lg:text-left'
          )}
        >
          Como empreendedor, você está na linha de frente da inovação. Suas
          ideias têm o poder de mudar vidas, criar empregos e contribuir para a
          sociedade. Mas essa jornada não é fácil. Ela exige resiliência,
          criatividade e uma vontade incessante de aprender e se adaptar. Por
          isso, para lhe ajudar nessa jornada rumo ao sucesso, o e-book{' '}
          <span className="text-yellow-300">EMPREENDEDOR IMBATÍVEL</span> é
          essencial no caminho até sucesso.
        </p>

        <button
          className={twMerge(
            'cursor-pointer z-10 flex h-14 items-center justify-center gap-2 rounded-lg bg-green-500 shadow-md',
            'transition-colors',
            'active:bg-green-300',
            'hover:bg-green-300',
            'lg:max-w-96 lg:h-16 lg:px-6'
          )}
          aria-label="ebook"
        >
          <span className="text-xl font-semibold text-white">
            Garanta seu E-BOOK AGORA!
          </span>
          <ArrowUpRight />
        </button>
      </div>

      <div className={twMerge('relative')}>
        <Image
          src={graph}
          alt="Gráfico"
          width={61}
          className={twMerge('absolute top-8', 'lg:-left-28')}
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
          className={twMerge('absolute bottom-0', 'lg:-left-28 lg:bottom-10')}
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
          className="h-auto w-full border-4 border-white"
        />

        <div
          className={twMerge(
            '-z-10 absolute left-0 top-0 min-h-[568px] min-w-[350px] rotate-45 bg-gradient_red blur-3xl',
            'lg:min-h-[468px] lg:min-w-[650px] lg:-rotate-45 lg:top-20 lg:opacity-45'
          )}
        />
      </div>

      <div
        className={twMerge(
          'absolute -z-10 -top-24 left-0 min-h-[668px] min-w-[350px] -rotate-45 bg-gradient_purple blur-3xl',
          'lg:min-w-[450px] lg:min-h-[768px] lg:-rotate-45 lg:opacity-45'
        )}
      />
    </section>
  )
}
