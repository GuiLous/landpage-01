import { twMerge } from 'tailwind-merge'

interface profileMatchStatsLinkBorderProps {
  showGameStatus: boolean
  won: boolean
}

export function ProfileMatchStatsLinkBorder({
  showGameStatus,
  won,
}: profileMatchStatsLinkBorderProps) {
  return (
    <div className="max-w-fit flex-initial items-center justify-center">
      <div
        className={twMerge(
          'mr-5 h-[50px] bg-purple-400 min-w-[3.3px] max-w-[3.3px] flex-initial rounded-br rounded-tr',
          '3xl:mr-3.5',
          showGameStatus && won && 'bg-green-600',
          showGameStatus && !won && 'bg-red-500',
          'ultrawide:h-[76px]'
        )}
      />
    </div>
  )
}
