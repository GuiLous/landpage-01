import { Loading } from '@/components/shared'

export default function loading() {
  return (
    <div className="">
      <Loading.Overlay>
        <Loading.Gif />
      </Loading.Overlay>
    </div>
  )
}
