import { twMerge } from 'tailwind-merge'

export function HomeMobileSectionMessage() {
  return (
    <p
      className={twMerge(
        'max-w-[324px] text-lg leading-7',
        'xl:text-center xl:text-base'
      )}
    >
      Jogue partidas <span className="font-semibold">5x5 ranqueadas</span> no
      GTA. Plante, desarme, suba de nível e <br /> prove seu valor. Reload.
    </p>
  )
}
