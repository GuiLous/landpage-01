import { ReactNode } from 'react'

interface MatchStatsTableProps {
  children: ReactNode
}

export function MatchStatsTableRoot({ children }: MatchStatsTableProps) {
  return (
    <section className="overflow-hidden rounded border border-gray-900 bg-gray-500">
      <table className="w-full bg-gray-900">{children}</table>
    </section>
  )
}
