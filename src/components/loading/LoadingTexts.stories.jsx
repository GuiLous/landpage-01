import { LoadingTexts } from '@components'

const textsArray = [
  `Ligando as luzes`,
  `Limpando os bombsites`,
  `Calibrando as armas da loja`,
  `Testando a c4`,
  `Checando a validade dos coletes`,
  `Distribuindo os créditos`,
  `Sorteando os lados iniciais`,
  `Distribuindo os trajes`,
]

export default {
  title: 'Loading/LoadingTexts',
  component: LoadingTexts,
  argTypes: {
    intervalTime: { control: { type: 'number' } },
    textsArray: { control: { type: 'array' } },
  },
  args: {
    intervalTime: 3000,
    textsArray: textsArray,
  },
}

export const Default = {
  render: (props) => <LoadingTexts {...props} />,
}
