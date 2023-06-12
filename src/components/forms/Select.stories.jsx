import { Select } from '@components'
import { useForm } from 'react-hook-form'

const options = [
  {
    value: 'Relatar um bug - algo não está funcionando corretamente',
    label: 'Relatar um bug - algo não está funcionando corretamente',
  },
  { value: 'Reportar um usuário', label: 'Reportar um usuário' },
  { value: 'Sugestão de funcionalidade', label: 'Sugestão de funcionalidade' },
  { value: 'Ajuda', label: 'Ajuda' },
]

export default {
  title: 'Forms/Select',
  component: Select,
  argTypes: {
    options: { control: 'array' },
    isInvalid: { control: 'boolean' },
  },
  args: {
    options: options,
    isInvalid: false,
  },
}

export const Default = (props) => {
  const { control } = useForm()

  return <Select control={control} options={options} {...props} />
}
