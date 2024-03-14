import { twMerge } from 'tailwind-merge'

import { StoreItem, getUserInventory } from '@/functions'

import {
  AccountPlayerDecoration,
  AccountSectionTitle,
} from '@/components/pages'

export async function ProfileDecorativeRender() {
  const inventory = await getUserInventory()

  let cards: StoreItem[] = []
  let covers: StoreItem[] = []

  if (inventory.items) {
    cards = inventory.items.filter((item) => item.subtype === 'card')
    covers = inventory.items.filter((item) => item.subtype === 'profile')
  }

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
          <AccountPlayerDecoration title="Card de jogador" items={cards} />

          <AccountPlayerDecoration
            title="Capa de perfil"
            items={covers}
            isProfileCover
          />
        </div>
      </div>
    </section>
  )
}
