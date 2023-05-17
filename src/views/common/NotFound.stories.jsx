import { NotFoundView } from '@views'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Common/NotFoundView',
  component: NotFoundView,
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <NotFoundView {...props} />
    </BrowserRouter>
  ),
}
