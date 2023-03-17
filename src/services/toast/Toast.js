import { createStandaloneToast } from '@chakra-ui/react'

export default function Toast({ title, description, status }) {
  const { toast } = createStandaloneToast()

  toast({
    title: title,
    description: description,
    status: status,
    isClosable: true,
    position: 'bottom-right',
    variant: 'subtle',
    duration: 6000,
  })
}
