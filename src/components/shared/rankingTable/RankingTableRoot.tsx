import { ReactNode } from 'react'

interface RankingTableRootProps {
  children: ReactNode
}

export function RankingTableRoot({ children }: RankingTableRootProps) {
  return <table className="w-full">{children}</table>
}
