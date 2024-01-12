import { ItemType } from '@/functions'

const items = {
  wear: 'Roupa',
  spray: 'Spray',
  persona: 'Personagem',
  consumable: 'Consumível',
  weapon: 'Arma',
  decorative: 'Customizável',
}

export function getItemName(item: ItemType) {
  return items[item]
}
