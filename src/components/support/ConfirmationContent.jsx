import { Image, Text } from '@chakra-ui/react'

import checkCircle from '@assets/images/check_circle.png'

import { Container } from '@components'

export default function ConfirmationContent() {
  return (
    <Container
      justify="center"
      align="center"
      column
      gap={32}
      style={{ padding: '0 40px' }}
    >
      <Container fitContent align="center" justify="center">
        <Image
          src={checkCircle}
          alt="check image"
          w="66px"
          h="66px"
          dropShadow="0px 0px 80px rgba(104, 71, 255, 0.25)"
        />
      </Container>

      <Container
        column
        align="center"
        justify="center"
        gap={10}
        style={{ maxWidth: '460px' }}
      >
        <Text
          fontWeight="bold"
          fontSize={16}
          color="white"
          textTransform="uppercase"
        >
          Obrigado!
        </Text>

        <Text
          fontWeight="regular"
          fontSize={14}
          color="white"
          textAlign="center"
        >
          Sua mensagem foi recebida. Fique de olho no seu e-mail e assim que
          possível, retornaremos.
        </Text>
      </Container>
    </Container>
  )
}
