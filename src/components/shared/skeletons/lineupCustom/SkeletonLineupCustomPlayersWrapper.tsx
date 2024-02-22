import { SkeletonLineupCustomSide } from './SkeletonLineupCustomSide'

export function SkeletonLineupCustomPlayersWrapper() {
  return (
    <div className="justify-center gap-6">
      <SkeletonLineupCustomSide />
      <SkeletonLineupCustomSide side="Atacantes" />
      <SkeletonLineupCustomSide side="Observadores" />
    </div>
  )
}
