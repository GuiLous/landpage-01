import { Image, Text, useMediaQuery } from '@chakra-ui/react'

import checkCircle from '@assets/images/check_circle.png'

import { Container } from '@components'

export default function ConfirmationContent() {
  const [isLessThan2xl] = useMediaQuery('(max-width: 1600px)')

  return (
    <Container
      justify="center"
      align="center"
      column
      gap={isLessThan2xl ? 22 : 32}
      style={{ padding: isLessThan2xl ? '0 20px' : '0 40px' }}
    >
      <Container fitContent align="center" justify="center">
        <Image
          src={checkCircle}
          alt="check image"
          w={{ base: '66px', md: '56px', '2xl': '66px' }}
          h={{ base: '66px', md: '56px', '2xl': '66px' }}
          dropShadow="0px 0px 80px rgba(104, 71, 255, 0.25)"
        />
      </Container>

      <Container
        column
        align="center"
        justify="center"
        gap={10}
        style={{ maxWidth: isLessThan2xl ? '420px' : '460px' }}
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
