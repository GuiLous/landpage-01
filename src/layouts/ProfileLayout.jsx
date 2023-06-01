import { Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { Container, Header, HeaderProfile } from '@components'

import { Link } from 'react-router-dom'
import style from './ProfileLayout.module.css'

const buttonsOptions = ['perfil', 'conta']

export default function ProfileLayout({
  headerStats,
  children,
  activePage = 'perfil',
  user_id,
}) {
  const user = useSelector((state) => state.user)

  const renderButtonsNavigation = () => {
    return buttonsOptions.map((btnOption) => (
      <Button
        key={btnOption}
        w="fit-content"
        borderRadius="4px"
        variant="secondary"
        fontSize={14}
        fontWeight={activePage === btnOption ? 'semiBold' : 'regular'}
        py="14px"
        px="16px"
        minH="40px"
        textTransform="uppercase"
        color={activePage === btnOption ? 'white' : 'gray.700'}
        borderColor={activePage === btnOption ? 'white' : 'gray.700'}
        _hover={{ bg: 'transparent', borderColor: 'white' }}
        as={Link}
        to={
          btnOption === 'perfil' ? `/${btnOption}/${user.id}` : `/${btnOption}`
        }
      >
        {btnOption}
      </Button>
    ))
  }
  return (
    <Container column className={style.container}>
      {user && <Header />}

      <Container column fitContent className={style.content} gap={40}>
        {headerStats && <HeaderProfile profile={headerStats} />}

        {Number(user_id) === user.id && (
          <Container align="center" gap={14}>
            {renderButtonsNavigation()}
          </Container>
        )}

        {children}
      </Container>
    </Container>
  )
}
