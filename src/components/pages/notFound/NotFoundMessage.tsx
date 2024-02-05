import { twMerge } from 'tailwind-merge'

export function NotFoundMessage() {
  return (
    <p className={twMerge('text-center', 'ultrawide:text-2xl')}>
      Ops! Parece que você achou a página de erro 404.
      <br />
      Mas não se preocupe, vamos te guiar até uma página segura.
    </p>
  )
}
