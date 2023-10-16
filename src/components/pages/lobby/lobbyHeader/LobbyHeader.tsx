import { BiSolidJoystick } from 'react-icons/bi'

export function LobbyHeader() {
  return (
    <header className="mb-5 flex-initial items-center gap-3">
      <BiSolidJoystick className="text-[34px] text-white 3xl:text-3xl" />

      <div className="gap-2">
        <h2 className="text-xl font-light uppercase text-white 3xl:text-lg">
          Suba de nível e
        </h2>
        <h2 className="text-xl font-semibold uppercase text-white 3xl:text-lg">
          {' '}
          fique entre os melhores
        </h2>
      </div>
    </header>
  )
}
