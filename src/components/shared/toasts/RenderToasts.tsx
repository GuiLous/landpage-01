import { ToastList } from './ToastList'

export function RenderToasts() {
  return (
    <div className="fixed bottom-10 right-10 z-50 max-w-[370px]">
      <ToastList />
    </div>
  )
}
