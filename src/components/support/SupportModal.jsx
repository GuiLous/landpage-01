import { FormControl, Text, Textarea } from '@chakra-ui/react'

import { Container, Modal } from '@components'

export default function SupportModal({ isOpenModal, handleClose }) {
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
        gap={40}
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
          <FormControl>
            <Textarea placeholder="Descrição" h="98px" resize="none" />
          </FormControl>
        </form>
      </Container>
    </Modal>
  )
}
