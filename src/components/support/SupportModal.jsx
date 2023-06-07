import { Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'

import { Container, FileInput, Modal } from '@components'

export default function SupportModal({ isOpenModal, handleClose }) {
  const [file, setFile] = useState(null)
  console.log('🚀 - file:', file)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Modal
      isOpen={isOpenModal}
      title="SUPORTE RELOAD CLUB"
      onClose={handleClose}
      headerMarginBottom={24}
      size="2xl"
    >
      <Container
        justify="center"
        align="center"
        column
        gap={32}
        style={{ padding: '0 40px' }}
      >
        <Text color="gray.700" fontSize={14} textAlign="center">
          Tem alguma dúvida? Envie para nosso suporte e logo retornaremos.
        </Text>

        <form
          method="POST"
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <Container column gap={14}>
            <Textarea placeholder="Descrição" variant="primary" />

            <FileInput setFile={setFile} />
          </Container>
        </form>
      </Container>
    </Modal>
  )
}
