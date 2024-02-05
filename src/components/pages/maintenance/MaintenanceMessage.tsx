import { twMerge } from 'tailwind-merge'

export function MaintenanceMessage() {
  return (
    <p
      className={twMerge(
        'max-w-[600px] text-center',
        'ultrawide:text-2xl ultrawide:max-w-[900px]'
      )}
    >
      Calmô meu cria, a gente deu um pause pra ajustar umas coisas, mas já
      voltamos. Fica tranquilo que assim que terminar por aqui, a gente te
      libera no automático.
    </p>
  )
}
