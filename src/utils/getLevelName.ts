export const getLeveName = (level: number) => {
  if (level <= 5) return 'Bronze'
  if (level <= 10) return 'Prata'
  if (level <= 15) return 'Ouro'
  if (level <= 20) return 'Platina'
  if (level <= 25) return 'Regente'
  if (level <= 29) return 'Maestro'

  return 'Elite'
}
