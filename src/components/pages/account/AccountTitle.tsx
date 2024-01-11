import { twMerge } from 'tailwind-merge'

export function AccountTitle() {
  return (
    <section
      className={twMerge('flex-initial items-center px-[3.750rem]', '3xl:px-7')}
    >
      <h1
        className={twMerge(
          'font-semibold text-white text-xl',
          'leading-none',
          '3xl:text-lg'
        )}
      >
        CONFIGURAÇÕES DE CONTA
      </h1>
    </section>
  )
}
