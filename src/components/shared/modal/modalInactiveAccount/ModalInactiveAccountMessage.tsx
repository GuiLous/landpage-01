import { twMerge } from 'tailwind-merge'

export function ModalInactiveAccountMessage() {
  return (
    <p
      className={twMerge(
        'max-w-[624px] text-center text-white',
        'ultrawide:max-w-[924px] ultrawide:text-2xl'
      )}
    >
      Atenção! Ao inativar sua conta você pode perder quaisquer benefícios
      adquiridos e seu perfil não aparecerá nos resultados e buscas. Pare
      reativar a conta, será necessário entrar em contato com suporte pelo
      e-mail <br /> <span className="text-cyan-400">suporte@reloadclub.gg</span>
    </p>
  )
}
