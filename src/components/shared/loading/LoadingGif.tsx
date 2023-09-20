import Image from 'next/image'

import loadingGif from '@/assets/images/loading.gif'

export function LoadingGif() {
  return (
    <div className="flex-initial items-center justify-center">
      <Image
        src={loadingGif}
        alt="Carregando..."
        data-testid="loading"
        className="max-w-[48px]"
      />
    </div>
  )
}
