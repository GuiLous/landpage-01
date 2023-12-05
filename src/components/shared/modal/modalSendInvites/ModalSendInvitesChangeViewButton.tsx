import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

import { Link } from '@/components/shared'

interface ModalSendInvitesChangeViewButtonProps {
  changeView: boolean
  setChangeView: (state: boolean) => void
}

export function ModalSendInvitesChangeViewButton({
  changeView,
  setChangeView,
}: ModalSendInvitesChangeViewButtonProps) {
  return (
    <div className="max-w-fit flex-initial items-center justify-center">
      <Link href="" asChild>
        <button
          className={twMerge(
            'flex w-fit items-center gap-2',
            !changeView && '-mt-2'
          )}
          onClick={() => setChangeView(!changeView)}
        >
          {changeView ? (
            <>
              <IoIosArrowRoundBack size={31} />
              <span className="text-sm">Voltar</span>
            </>
          ) : (
            <>
              <span className="text-sm">Ver convites enviados</span>
              <IoIosArrowRoundForward size={31} />
            </>
          )}
        </button>
      </Link>
    </div>
  )
}
