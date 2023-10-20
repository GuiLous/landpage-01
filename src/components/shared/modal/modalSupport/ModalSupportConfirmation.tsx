import Image from 'next/image'

import checkCircle from '@/assets/images/check_circle.png'

export function ModalSupportConfirmation() {
  return (
    <div className="mt-8 flex-col items-center justify-center gap-8 px-10 3xl:gap-6 3xl:px-5">
      <div className="flex-initial items-center justify-center">
        <Image
          src={checkCircle}
          alt="Check image"
          className="h-[66px] w-[66px] drop-shadow-support_confirmation 3xl:h-[56px] 3xl:w-[56px]"
        />
      </div>

      <div className="w-[460px] flex-col items-center justify-center gap-2.5 3xl:w-[420px]">
        <span className="font-bold uppercase text-white">Obrigado!</span>
        <p className="text-center text-sm text-white">
          {' '}
          Sua mensagem foi recebida. Fique de olho no seu e-mail e assim que
          possível, retornaremos.
        </p>
      </div>
    </div>
  )
}
