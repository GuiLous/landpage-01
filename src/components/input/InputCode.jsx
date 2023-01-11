import ReactCodeInput from 'react-verification-code-input'

import { Container } from '@components'
import style from './InputCode.module.css'

export default function InputCode() {
  const handleSubmit = (v) => {
    console.log(v)
  }

  return (
    <Container className={style.container} align="center" justify="center">
      <ReactCodeInput
        type="text"
        fields={6}
        onComplete={handleSubmit}
        autoFocus={true}
        className={style.fieldset}
      />
    </Container>
  )
}
