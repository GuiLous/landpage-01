import { twMerge } from 'tailwind-merge'

export function ModalDeleteAccountMessage() {
  return (
    <p
      className={twMerge(
        'max-w-[624px] text-center text-white',
        'ultrawide:max-w-[924px] ultrawide:text-2xl'
      )}
    >
      Atenção! Ao confirmar, você perderá todo histórico de partidas, nível,
      itens adquiridos na loja ou por outros meios. A exclusão apaga
      permanentemente todas as informações associadas à sua conta. Caso queira
      utilizar nossos serviços novamente, terá que fazer um novo cadastro para
      criar uma nova conta. Deseja mesmo prosseguir?
    </p>
  )
}
