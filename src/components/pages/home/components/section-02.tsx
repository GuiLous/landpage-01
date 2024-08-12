import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Section02Props = {
  children?: ReactNode
}

export function Section02({ children }: Section02Props) {
  return (
    <section
      id="section02"
      className={twMerge('flex flex-col gap-12 px-6', 'lg:px-32')}
    >
      <h2 className="text-center font-poppins text-4xl font-bold leading-snug">
        Uma <span className="text-yellow-300">Mentalidade</span> Empreendedora
      </h2>

      <p
        className={twMerge('text-center text-xl font-semibold', 'lg:text-2xl')}
      >
        Você está cansado de{' '}
        <span className="text-yellow-300">EMPREENDER E NÃ0 TER RESULTADO?</span>{' '}
        Quer finalmente ter uma{' '}
        <span className="text-yellow-300">MENTALIDADE EMPREENDEDORA?</span>{' '}
        Nosso eBook é exatamente o que você precisa para transformar suas
        dificuldades em sucesso!
      </p>

      {children}
    </section>
  )
}
