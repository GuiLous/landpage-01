import { twMerge } from 'tailwind-merge'

import { VerifyChangeEmail, VerifyForm, VerifyHeader } from '@/components/pages'

export default function Verify() {
  return (
    <main
      className={twMerge(
        'flex-initial flex-col items-center justify-center gap-10',
        'ultrawide:gap-28'
      )}
    >
      <div className={twMerge('flex-col gap-6', 'ultrawide:gap-12')}>
        <VerifyHeader />

        <VerifyForm>
          <VerifyChangeEmail />
        </VerifyForm>
      </div>
    </main>
  )
}
