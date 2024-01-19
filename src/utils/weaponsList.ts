/* eslint-disable import-helpers/order-imports */
/* eslint-disable prettier/prettier */

import WEAPON_APPISTOL from '@/assets/images/weapons/WEAPON_APPISTOL.webp'
import WEAPON_ASSAULTRIFLE from '@/assets/images/weapons/WEAPON_ASSAULTRIFLE.webp'
import WEAPON_ASSAULTSHOTGUN from '@/assets/images/weapons/WEAPON_ASSAULTSHOTGUN.webp'
import WEAPON_COMBATMG from '@/assets/images/weapons/WEAPON_COMBATMG.webp'
import WEAPON_HEAVYSNIPER from '@/assets/images/weapons/WEAPON_HEAVYSNIPER.webp'
import WEAPON_MG from '@/assets/images/weapons/WEAPON_MG.webp'
import WEAPON_MICROSMG from '@/assets/images/weapons/WEAPON_MICROSMG.webp'
import WEAPON_PISTOL from '@/assets/images/weapons/WEAPON_PISTOL.webp'
import WEAPON_PISTOL50 from '@/assets/images/weapons/WEAPON_PISTOL50.webp'
import WEAPON_PISTOL_MK2 from '@/assets/images/weapons/WEAPON_PISTOL_MK2.webp'
import WEAPON_PUMPSHOTGUN from '@/assets/images/weapons/WEAPON_PUMPSHOTGUN.webp'
import WEAPON_SMG from '@/assets/images/weapons/WEAPON_SMG.webp'
import WEAPON_SNIPERRIFLE from '@/assets/images/weapons/WEAPON_SNIPERRIFLE.webp'
import WEAPON_TACTICALRIFLE from '@/assets/images/weapons/WEAPON_TACTICALRIFLE.webp'


const pistols = [
  {
    name: 'Pistola',
    gunImg: WEAPON_PISTOL,
  },
  {
    name: 'Rapidinha',
    gunImg: WEAPON_APPISTOL,
  },
  {
    name: '9idade',
    gunImg: WEAPON_PISTOL_MK2,
  },
  {
    name: 'Trinta e Oito',
    gunImg: WEAPON_PISTOL50,
  },
]

const subMachineGuns = [
  {
    name: 'Micro',
    gunImg: WEAPON_MICROSMG,
  },
  {
    name: 'Nova',
    gunImg: WEAPON_SMG,
  },
]

const shotGuns = [
  {
    name: 'Doze',
    gunImg: WEAPON_PUMPSHOTGUN,
  },
  {
    name: 'Bull',
    gunImg: WEAPON_ASSAULTSHOTGUN,
  },
]

const rifles = [
  {
    name: 'AK',
    gunImg: WEAPON_ASSAULTRIFLE,
  },
  {
    name: 'M4',
    gunImg: WEAPON_TACTICALRIFLE,
  },
  {
    name: 'Teco-Teco',
    gunImg: WEAPON_SNIPERRIFLE,
  },
  {
    name: 'Sniper',
    gunImg: WEAPON_HEAVYSNIPER,
  }
]

const machineGuns = [
  {
    name: 'Rambinho',
    gunImg: WEAPON_MG,
  },
  {
    name: 'Rambão',
    gunImg: WEAPON_COMBATMG,
  },
]

export const weapons = {
  pistolas: pistols,
  submetralhadoras: subMachineGuns,
  escopetas: shotGuns,
  metralhadoras: machineGuns,
  fuzis: rifles,
}

export type WeaponType =  keyof typeof weapons
export type WeaponObject = typeof weapons.escopetas[0]

export type WeaponNameType =
'Pistola' |
'Rapidinha' |
'9idade' |
'Trinta e Oito' |
'Micro' |
'Nova' |
'Doze' |
'Bull' |
'AK' |
'M4' |
'Teco-Teco' |
'Sniper' |
'Rambinho' |
'Rambão'
