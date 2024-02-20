import { twMerge } from 'tailwind-merge'

interface ImagePreviewEmptyMessageProps {
  isArsenal?: boolean
  hasSkins?: boolean
}

export function ImagePreviewEmptyMessage({
  hasSkins = false,
  isArsenal = false,
}: ImagePreviewEmptyMessageProps) {
  return (
    <span
      className={twMerge(
        'ml-[20%] text-gray-300',
        '3xl:ml-0 3xl:text-sm',
        isArsenal && 'ml-0'
      )}
    >
      {isArsenal && hasSkins && 'Skin padrão do jogo.'}
      {isArsenal && !hasSkins && 'Voçê ainda não possui skins para essa arma.'}
      {!isArsenal && 'Ops, nenhum item selecionado.'}
    </span>
  )
}
