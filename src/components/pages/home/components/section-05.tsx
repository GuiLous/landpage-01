import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import add from '@/assets/images/add.svg'
import circles from '@/assets/images/circles.svg'

export function Section05() {
  return (
    <section
      id="section05"
      className={twMerge(
        'relative mt-20 flex flex-col gap-12 px-6',
        'lg:px-32 lg:flex-row lg:justify-between lg:items-center'
      )}
    >
      <h2
        className={twMerge(
          'text-center font-poppins text-4xl font-bold leading-normal',
          'lg:text-start lg:max-w-[62%]'
        )}
      >
        Aprenda Manter e Cultivar Uma Mentalidade De Sucesso Como Um
        Empreendedor <span className="text-yellow-300 ">Imbatível</span>
      </h2>

      <button
        className={twMerge(
          'cursor-pointer z-10 flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-500 shadow-md',
          'transition-colors',
          'active:bg-blue-300',
          'hover:bg-blue-300',
          'lg:max-w-64 lg:h-14 lg:px-6'
        )}
        aria-label="ebook"
      >
        <span className="text-lg font-medium">Garanta seu E-BOOK</span>
        <ArrowUpRight />
      </button>

      <Image
        src={add}
        alt="Mais"
        width={39}
        className="absolute -top-20 right-6"
        quality={50}
      />

      <Image
        src={circles}
        alt="Círculos"
        width={35}
        className="absolute -bottom-16 left-6"
        quality={50}
      />

      <div
        className={twMerge(
          'absolute -top-24 left-0 min-h-[668px] min-w-[350px] rotate-45 bg-gradient_red blur-3xl',
          'lg:inset-0 lg:rotate-180 lg:opacity-35'
        )}
      />
    </section>
  )
}
