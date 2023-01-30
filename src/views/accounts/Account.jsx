import {
  Button,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Container } from '@components'
import { MainLayout } from '@layouts'

import { HttpService, StorageService } from '@services'
import { updateUser } from '@slices/UserSlice'
import { useState } from 'react'

export default function AccountView() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [fetching, setFetching] = useState(false)

  const handleLogout = () => {
    dispatch(updateUser(null))
    StorageService.remove('token')
    navigate('/')
  }

  const handleAccountInactivation = async () => {
    if (fetching) return

    setFetching(true)
    const token = StorageService.get('token')
    const response = await HttpService.delete('accounts/', token)
    setFetching(false)

    if (response && response.errorMsg) {
      toast({
        title: 'Oops, ocorreu um erro',
        description: response.errorMsg,
        status: 'error',
        isClosable: true,
        position: 'bottom-right',
        duration: 6000,
      })
      return
    }

    handleLogout()
  }

  return (
    <MainLayout>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inativar conta</ModalHeader>
          <ModalBody>
            <p>
              Ao inativar sua conta você perde acesso a ela e a exclusão dos
              seus dados é agendada para 7 dias após a solicitação.
              <br />
              <br />
              Seu progresso será perdido, bem como suas conquistas e quaisquer
              valores ou moedas que possua na sua carteira ou na loja.
              <br />
              <br />
              <strong>
                Você está ciente dos riscos e tem certeza absoluta que deseja
                realizar essa ação?
              </strong>
            </p>
          </ModalBody>

          <ModalFooter>
            <Button size="sm" mr={3} onClick={onClose} isDisabled={fetching}>
              Voltar
            </Button>
            <Button
              size="sm"
              variant="danger"
              loadingText="Inativando..."
              isLoading={fetching}
              onClick={handleAccountInactivation}
            >
              Quero inativar minha conta
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Container column gap={30}>
        <Container>{user.account.username}'s account page</Container>

        <Container>
          <UnorderedList>
            <ListItem>
              <Link as={RouterLink} to="/alterar-email">
                Alterar e-mail
              </Link>
            </ListItem>

            <ListItem>
              <Link onClick={onOpen}>Inativar conta</Link>
            </ListItem>
          </UnorderedList>
        </Container>
      </Container>
    </MainLayout>
  )
}
