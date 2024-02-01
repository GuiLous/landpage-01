import Image from 'next/image'

const inactiveBg = '/assets/images/inactive_bg.png'

export function InactiveHeroImage() {
  return (
    <div className="flex-initial justify-center ">
      <Image src={inactiveBg} alt="Inactive gta persona" className="w-[16%]" />
    </div>
  )
}
