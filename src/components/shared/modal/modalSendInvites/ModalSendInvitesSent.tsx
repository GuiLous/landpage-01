import { BsEnvelopeFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import { UserInvites } from '@/store/slices/userSlice'

import { CustomIcon } from '../../icons/CustomIcon'
import { ModalSendInvitesChangeViewButton } from './ModalSendInvitesChangeViewButton'

interface ModalSendInvitesSentProps {
  changeView: boolean
  setChangeView: (state: boolean) => void
  invites: UserInvites[]
}

export function ModalSendInvitesSent({
  changeView,
  invites,
  setChangeView,
}: ModalSendInvitesSentProps) {
  const hasInvitesSent = invites.length > 0

  return (
    <div className="min-w-[542px] flex-col items-center justify-center gap-10">
      <div className="-ml-3 items-center justify-start">
        <ModalSendInvitesChangeViewButton
          changeView={changeView}
          setChangeView={setChangeView}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold leading-none text-white">
          CONVITES ENVIADOS
        </h2>
      </div>

      {!hasInvitesSent ? (
        <div className="items-center">
          <p className="text-sm text-gray-300">
            Você ainda não enviou nenhum convite.
          </p>
        </div>
      ) : (
        <div className="flex-col items-center last:border-0">
          {invites.map((invite, index) => (
            <div
              key={index}
              className={twMerge(
                'items-center justify-between border-b border-b-gray-700 py-4 last:border-0 first:pt-0 last:pb-0'
              )}
            >
              <div className="items-center gap-3.5">
                <div className="max-w-fit flex-initial">
                  <CustomIcon
                    icon={BsEnvelopeFill}
                    className="align-middle text-lg text-gray-300"
                  />
                </div>
                <span className="text-sm text-gray-300">{invite.email}</span>
              </div>

              <span
                className={twMerge(
                  'bg-purple-400 rounded-[67px] text-white text-xs font-medium leading-none py-2 px-3.5 capitalize',
                  invite.accepted && 'bg-green-600'
                )}
              >
                {invite.accepted ? 'Aceito' : 'Convidado'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
