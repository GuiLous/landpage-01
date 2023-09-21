import { VerifyFooter, VerifyForm, VerifyHeader } from '@/components/pages'

export default function Verify() {
  return (
    <main className="flex-initial flex-col items-center justify-center gap-10">
      <VerifyHeader />

      <VerifyForm />

      <VerifyFooter />
    </main>
  )
}
