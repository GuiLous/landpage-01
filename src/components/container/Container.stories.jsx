import Container from './Container'

export default {
  title: 'Common/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    row: { control: 'boolean' },
    column: { control: 'boolean' },
    reverseRow: { control: 'boolean' },
    reverseColumn: { control: 'boolean' },
    align: {
      control: 'select',
      options: ['center', 'start', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['center', 'start', 'end', 'around', 'between', 'even'],
    },
    gap: { control: 'number' },
    fitContent: { control: 'boolean' },
  },
}

export const Default = {
  render: (props) => (
    <Container {...props} style={{ border: '1px dashed #6847FF' }}>
      <p>Content A</p>
      <p>Content B</p>
      <p>Content C</p>
      <p>Content D</p>
      <p>Content E</p>
      <p>Content F</p>
    </Container>
  ),
}
