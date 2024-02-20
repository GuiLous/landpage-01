import Image from 'next/image'

export function LineupCustomMap() {
  return (
    <div className="relative row-span-2 flex-initial overflow-hidden rounded">
      <Image
        src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/10/gta-v-vinewood-bowl.jpg"
        fill
        sizes="50vw"
        className="object-cover"
        alt="Gta map image"
      />
    </div>
  )
}
