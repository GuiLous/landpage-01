import { Icon, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  BackpackIcon,
  Container,
  SettingsIcon,
  SupportIcon,
  SupportModal,
  UserIcon,
  WarningCircleIcon,
} from '@components'
import { toggleFriendList } from '@slices/AppSlice'

import style from './ProfileHeaderButtons.module.css'

const userLoggedButtons = ['inventory', 'config', 'profile']
const linksPaths = {
  perfil: 'profile',
  conta: 'config',
  inventario: 'inventory',
}

export default function ProfileHeaderButtons({ isUserLogged, username }) {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.user)

  const { userId } = params
  const path = location.pathname.split('/')[1]

  const [openSupport, setOpenSupport] = useState(false)

  const profileButtons = {
    profile: { icon: UserIcon, label: 'Meu perfil' },
    inventory: { icon: BackpackIcon, label: 'Meu inventário' },
    config: { icon: SettingsIcon, label: 'Configurações' },
    steam_chat: { icon: SupportIcon, label: 'Abrir bate-papo' },
    report: { icon: WarningCircleIcon, label: 'Reportar usuário' },
  }

  const keys = Object.keys(profileButtons)

  const handleOpenModalSupport = () => {
    setOpenSupport(true)
  }

  const onClickFunction = (key) => {
    switch (key) {
      case 'inventory':
        dispatch(toggleFriendList(false))
        navigate(`/inventory/${user.id}`)
        break

      case 'profile':
        dispatch(toggleFriendList(false))
        navigate(`/perfil/${user.id}`)
        break

      case 'config':
        dispatch(toggleFriendList(false))
        navigate(`/conta`)
        break

      case 'steam_chat':
        window.open(`https://steamcommunity.com/chat`, '_blank')
        break

      case 'report':
        handleOpenModalSupport()
        break

      default:
        return null
    }
  }

  return (
    <Container gap={12} className={style.container}>
      {keys.map((key) =>
        isUserLogged
          ? userLoggedButtons.includes(key) && (
              <Container
                key={key}
                gap={14}
                align="center"
                className={[
                  style.profileBtn,
                  linksPaths[path] === key && style.active,
                ].join(' ')}
                onClick={() => onClickFunction(key)}
              >
                <Icon as={profileButtons[key].icon} />
                <Text fontSize={14} as="span" lineHeight={1}>
                  {profileButtons[key].label}
                </Text>
              </Container>
            )
          : !userLoggedButtons.includes(key) && (
              <Container
                key={key}
                gap={14}
                align="center"
                className={style.profileBtn}
                onClick={() => onClickFunction(key)}
              >
                <Icon as={profileButtons[key].icon} />
                <Text fontSize={14} as="span" lineHeight={1}>
                  {profileButtons[key].label}
                </Text>
              </Container>
            )
      )}

      <SupportModal
        isOpen={openSupport}
        setIsOpen={setOpenSupport}
        username={username}
        user_id={userId}
      />
    </Container>
  )
}
