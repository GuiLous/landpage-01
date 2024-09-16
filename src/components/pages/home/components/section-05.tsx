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
        'lg:px-32 lg:justify-between lg:items-center'
      )}
    >
      <h2
        className={twMerge(
          'text-center font-poppins text-4xl font-bold leading-normal',
          'lg:text-start lg:max-w-[62%]'
        )}
      >
        Não perca a oportunidade de chegar aonde você empreendedor sempre
        sonhou. <span className="text-yellow-300">O SUCESSO!</span> Uma empresa
        consolidada com muitos clientes e um fluxo de caixa recorrente está mais
        perto do que vc imagina. Não deixe para depois{' '}
        <span className="text-yellow-300">clica aqui em baixo</span> e saiba
        mais!
      </h2>

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
        <span className="text-xl font-medium text-white">
          Garanta seu E-BOOK AGORA!
        </span>
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
