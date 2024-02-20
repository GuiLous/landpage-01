/* eslint-disable import-helpers/order-imports */
/* eslint-disable prettier/prettier */

const WEAPON_APPISTOL = '/assets/images/weapons/WEAPON_APPISTOL.webp'
const WEAPON_ASSAULTRIFLE = '/assets/images/weapons/WEAPON_ASSAULTRIFLE.webp'
const WEAPON_ASSAULTSHOTGUN = '/assets/images/weapons/WEAPON_ASSAULTSHOTGUN.webp'
const WEAPON_COMBATMG = '/assets/images/weapons/WEAPON_COMBATMG.webp'
const WEAPON_HEAVYSNIPER = '/assets/images/weapons/WEAPON_HEAVYSNIPER.webp'
const WEAPON_MG = '/assets/images/weapons/WEAPON_MG.webp'
const WEAPON_MICROSMG = '/assets/images/weapons/WEAPON_MICROSMG.webp'
const WEAPON_PISTOL = '/assets/images/weapons/WEAPON_PISTOL.webp'
const WEAPON_PISTOL50 = '/assets/images/weapons/WEAPON_PISTOL50.webp'
const WEAPON_PISTOL_MK2 = '/assets/images/weapons/WEAPON_PISTOL_MK2.webp'
const WEAPON_PUMPSHOTGUN = '/assets/images/weapons/WEAPON_PUMPSHOTGUN.webp'
const WEAPON_SMG = '/assets/images/weapons/WEAPON_SMG.webp'
const WEAPON_SNIPERRIFLE = '/assets/images/weapons/WEAPON_SNIPERRIFLE.webp'
const WEAPON_TACTICALRIFLE = '/assets/images/weapons/WEAPON_TACTICALRIFLE.webp'


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


export const WeaponsName = [
'Pistola',
'Rapidinha',
'9idade',
'Trinta e Oito',
'Micro',
'Nova',
'Doze',
'Bull',
'AK',
'M4',
'Teco-Teco',
'Sniper',
'Rambinho',
'Rambão'
]
