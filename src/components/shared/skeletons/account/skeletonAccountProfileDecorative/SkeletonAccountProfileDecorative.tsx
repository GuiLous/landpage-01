import { twMerge } from 'tailwind-merge'

import { AccountSectionTitle } from '@/components/pages'

import { SkeletonAccountPlayerDecoration } from './SkeletonAccountPlayerDecoration'

export function SkeletonAccountProfileDecorative() {
  return (
    <section className={twMerge('flex-col gap-10', '3xl:gap-7')}>
      <AccountSectionTitle title="personalização de perfil" />

      <div
        className={twMerge(
          'flex-initial flex-col gap-6 px-[3.750rem]',
          '3xl:px-7 3xl:gap-5'
        )}
      >
        <div className={twMerge('gap-10', '3xl:gap-7')}>
          <SkeletonAccountPlayerDecoration title="Card de jogador" />
          <SkeletonAccountPlayerDecoration
            title="Capa de perfil"
            isProfileCover
          />
        </div>
      </div>
    </section>
  )
}
