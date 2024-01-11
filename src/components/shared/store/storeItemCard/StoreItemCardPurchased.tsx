import { BsCheckCircleFill } from 'react-icons/bs'

export function StoreItemCardPurchased() {
  const bgGradient =
    'linear-gradient(180deg, rgba(27, 27, 27, 0.6) 0%, #1b1b1b 100%)'

  return (
    <div
      className="absolute z-10 h-full w-full items-center justify-center gap-2 rounded-lg backdrop-blur-[2px]"
      style={{ background: bgGradient }}
    >
      <BsCheckCircleFill className="text-white" size={20} />

      <span className="text-lg font-bold uppercase text-white">
        Item adquirido
      </span>
    </div>
  )
}
