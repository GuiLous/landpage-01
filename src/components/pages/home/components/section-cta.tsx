import { ArrowUpRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function SectionCta() {
  return (
    <section
      className={twMerge(
        'flex items-center justify-center px-8 py-6 bg-white flex-col gap-3',
        'lg:px-12 lg:py-20 lg:gap-60 lg:flex-row'
      )}
    >
      <h3
        className={twMerge(
          'font-black text-black underline',
          'lg:max-w-96 lg:text-5xl'
        )}
      >
        #NÃO PERCA A OPORTUNIDADE
      </h3>

      <button
        className={twMerge(
          'cursor-pointer z-10 flex h-10 items-center justify-center w-60 gap-1 rounded-lg bg-gray-800 shadow-md',
          'transition-colors',
          'active:bg-gray-500',
          'hover:bg-gray-500',
          'lg:w-auto lg:max-w-96 lg:h-16 lg:px-6'
        )}
        aria-label="ebook"
      >
        <span
          className={twMerge('text-xs font-medium text-white', 'lg:text-xl')}
        >
          Quero meu E-BOOK AGORA!
        </span>
        <ArrowUpRight />
      </button>
    </section>
  )
}
