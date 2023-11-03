import { DateTime } from 'luxon'

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

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatDateToPtFormat = (date: string) => {
  const today = DateTime.local().startOf('day')
  const formattedDate = DateTime.fromISO(date)

  if (formattedDate.hasSame(today, 'day')) {
    return 'Hoje'
  } else if (formattedDate.hasSame(today.minus({ days: 1 }), 'day')) {
    return 'Ontem'
  } else {
    return `${
      formattedDate.toFormat("dd 'de' ") +
      capitalizeFirstLetter(formattedDate.toFormat('MMMM', { locale: 'pt' }))
    }`
  }
}

export function formatSecondsToHour(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours === 0)
    return `${minutes.toString().padStart(2, '0')}m${remainingSeconds
      .toString()
      .padStart(2, '0')}s`

  return `${hours.toString().padStart(2, '0')}h${minutes
    .toString()
    .padStart(2, '0')}m${remainingSeconds.toString().padStart(2, '0')}s`
}
