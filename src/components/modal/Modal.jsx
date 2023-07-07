import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

import { Container } from '@components'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  headerMarginBottom = 40,
  maxWidthModal = 'fit-content',
  ...props
}) {
  return (
    <ChakraModal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay />
      <ModalContent p={{ base: 10, md: 8, '2xl': 10 }} maxW={maxWidthModal}>
        <ModalHeader p={0} mb={headerMarginBottom + 'px'}>
          <Container justify="center">
            {title && (
              <Text
                color="white"
                fontSize={{ base: 20, md: 18, '2xl': 20 }}
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
              fontSize={12}
              width="fit-content"
              height="fit-content"
              top={4}
              right={4}
            />
          )}
        </ModalHeader>

        <ModalBody p={0}>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
