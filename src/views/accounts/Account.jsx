import { Icon, Link, Text } from '@chakra-ui/react'

import {
  BlockIcon,
  ChangeEmailCard,
  Container,
  DeleteAccountCard,
  InactivateAccountCard,
  MessageIcon,
  TrashIcon,
} from '@components'

import style from './Account.module.css'

const linksOptions = [
  {
    id: 'email',
    label: 'Alterar e-mail',
  },
  {
    id: 'inactive',
    label: 'Inativar conta',
  },
  {
    id: 'delete',
    label: 'Excluir conta',
  },
]

const icons = {
  email: MessageIcon,
  inactive: BlockIcon,
  delete: TrashIcon,
}

export default function AccountView() {
  const renderLinks = () => {
    return (
      <Container gap={22} column>
        {linksOptions.map((linkItem) => (
          <Link
            key={linkItem.id}
            href={'#' + linkItem.id}
            color="gray.700"
            fontWeight="regular"
            fontSize={18}
            lineHeight={1}
            display="flex"
            alignItems="center"
            gap="10px"
            className={style.link}
          >
            <Icon as={icons[`${linkItem.id}`]} fill="gray.700" />
            <Text>{linkItem.label}</Text>
          </Link>
        ))}
      </Container>
    )
  }

  return (
    <Container gap={60}>
      {/* <Container column style={{ maxWidth: '350px' }}>
        <Container fitContent style={{ marginBottom: '40px' }}>
          <Text
            color="white"
            fontWeight="bold"
            fontSize={20}
            textTransform="uppercase"
          >
            Gerenciamento de conta
          </Text>
        </Container>

        {renderLinks()}
      </Container> */}

      <Container column gap={24}>
        <ChangeEmailCard />
        <InactivateAccountCard />
        <DeleteAccountCard />
      </Container>
    </Container>
  )
}
