import { VerifyForm, VerifyHeader } from '@/components/pages'

export default function Verify() {
  return (
    <main className="flex-initial flex-col items-center justify-center gap-10">
      <div className="flex-col gap-6">
        <VerifyHeader />

        <VerifyForm />
      </div>
    </main>
  )
}
