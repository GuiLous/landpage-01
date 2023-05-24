import { Footer } from '@components'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Footer/Footer',
  component: Footer,
}

export const Default = {
  render: (props) => (
    <BrowserRouter>
      <Footer {...props} />
    </BrowserRouter>
  ),
}
