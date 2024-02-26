import zukeeper from 'zukeeper'
import { create } from 'zustand'

export type PreMatch = {
  id: number
  status: string
  countdown: number | null
  players_ready_count: number
  players_total: number
  user_ready: boolean
  ready: boolean
}

type PreMatchStore = {
  preMatch: PreMatch | null
  updatePreMatch: (preMatch: PreMatch | null) => void
}

export const usePreMatchStore = create<PreMatchStore>()(
  zukeeper((set: any) => ({
    preMatch: null,
    updatePreMatch: (preMatch: PreMatch | null) =>
      set(() => ({
        preMatch,
      })),
  }))
)
