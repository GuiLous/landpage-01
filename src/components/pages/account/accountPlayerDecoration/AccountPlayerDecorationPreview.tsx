import { twMerge } from 'tailwind-merge'

interface AccountPlayerDecorationPreviewProps {
  foreground_image?: string
  isProfileCover: boolean
}

export function AccountPlayerDecorationPreview({
  foreground_image,
  isProfileCover,
}: AccountPlayerDecorationPreviewProps) {
  return (
    <div
      className={twMerge(
        'flex-initial items-center justify-center bg-no-repeat bg-contain rounded-lg h-full min-w-[180px]',
        '3xl:min-w-[155px]',
        !isProfileCover && 'max-w-fit'
      )}
      style={{
        backgroundImage: `url(${foreground_image})`,
      }}
    />
  )
}
