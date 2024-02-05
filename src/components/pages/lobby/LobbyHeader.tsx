import { BiSolidJoystick } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

export function LobbyHeader() {
  return (
    <header className="mb-5 flex-initial items-center gap-3">
      <BiSolidJoystick
        className={twMerge(
          'text-[34px] text-white',
          '3xl:text-3xl',
          'ultrawide:text-6xl'
        )}
      />

      <div className="gap-2">
        <h2
          className={twMerge(
            'text-xl font-light uppercase text-white',
            '3xl:text-lg',
            'ultrawide:text-3xl'
          )}
        >
          Suba de nível e
        </h2>
        <h2
          className={twMerge(
            'text-xl font-semibold uppercase text-white',
            '3xl:text-lg',
            'ultrawide:text-3xl'
          )}
        >
          {' '}
          fique entre os melhores
        </h2>
      </div>
    </header>
  )
}
