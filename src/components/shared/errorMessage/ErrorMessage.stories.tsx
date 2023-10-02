import { Meta } from '@storybook/react'

import { ErrorMessage } from './ErrorMessage'

export default {
  title: 'Form/ErrorMessage',
  component: ErrorMessage,
} as Meta

export const Default = () => {
  return <ErrorMessage>Error test</ErrorMessage>
}
