import Image from 'next/image'

interface LineupCustomMapProps {
  thumbnail: string
}

export function LineupCustomMap({ thumbnail }: LineupCustomMapProps) {
  return (
    <div className="relative row-span-2 flex-initial overflow-hidden rounded">
      <Image
        src={thumbnail}
        fill
        sizes="50vw"
        className="object-cover"
        alt="Gta map image"
      />
    </div>
  )
}
