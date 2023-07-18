import { Loading, LoadingBackdrop } from '@components'

export default {
  title: 'Loading/LoadingBackdrop',
  component: LoadingBackdrop,
}

export const Default = {
  render: (props) => (
    <LoadingBackdrop {...props}>
      <Loading />
    </LoadingBackdrop>
  ),
}
