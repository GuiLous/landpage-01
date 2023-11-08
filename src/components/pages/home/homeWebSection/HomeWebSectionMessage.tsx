import { twMerge } from 'tailwind-merge'

export function HomeWebSectionMessage() {
  return (
    <p className={twMerge('max-w-[444px] text-lg leading-7')}>
      Jogue partidas <span className="font-semibold">5x5 ranqueadas</span> no
      GTA. Plante, desarme, suba de nível e prove seu valor. Reload.
    </p>
  )
}
