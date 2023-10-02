export function formatSecondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return (
    minutes.toString().padStart(2, '0') +
    ':' +
    remainingSeconds.toString().padStart(2, '0')
  )
}

type OptionsFormatted = {
  value: string
  label: string
}

export const formatSubjectOptions = (options: string[]) => {
  const optionsFormatted = options.reduce((acc, currentValue) => {
    acc.push({ value: currentValue, label: currentValue })
    return acc
  }, [] as OptionsFormatted[])

  return optionsFormatted
}
