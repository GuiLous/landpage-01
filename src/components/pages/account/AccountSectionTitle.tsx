import { twMerge } from 'tailwind-merge'

interface AccountSectionTitleProps {
  title: string
}

export function AccountSectionTitle({ title }: AccountSectionTitleProps) {
  return (
    <section
      className={twMerge('flex-initial items-center px-[3.750rem]', '3xl:px-7')}
    >
      <h1
        className={twMerge(
          'font-semibold text-white text-xl uppercase',
          'leading-none',
          '3xl:text-lg'
        )}
      >
        {title}
      </h1>
    </section>
  )
}
