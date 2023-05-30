import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

import { Container } from '@components'

export default function ModalConfirmation({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}) {
  return (
    <Modal
      size="3xl"
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent py="40px">
        <ModalHeader p={0} mb="40px">
          <Container justify="center">
            {title && (
              <Text
                color="white"
                fontSize={20}
                textTransform="uppercase"
                lineHeight={1}
                data-testid="title"
              >
                {title}
              </Text>
            )}
          </Container>
          {showCloseButton && (
            <ModalCloseButton
              fontSize={15}
              width="fit-content"
              height="fit-content"
              top={5}
              right={5}
            />
          )}
        </ModalHeader>

        <ModalBody p={0}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
