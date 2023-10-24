import { twMerge } from 'tailwind-merge'

export function FooterCopyright() {
  return (
    <div
      className={twMerge(
        'items-center justify-center',
        'xl:-mt-2 xl:max-w-fit'
      )}
    >
      <p className="text-xs">Copyright ©2023. Todos os direitos reservados.</p>
    </div>
  )
}
