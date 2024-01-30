import Image from 'next/image'

const loadingGif = '/assets/images/loading.gif'

export function LoadingGif() {
  return (
    <div className="z-50 flex-initial items-center justify-center">
      <Image
        src={loadingGif}
        alt="Carregando..."
        data-testid="loading"
        className="max-w-[48px]"
        priority
      />
    </div>
  )
}
