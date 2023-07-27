import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsEnvelopeFill, BsThreeDots } from 'react-icons/bs'
import { RiErrorWarningFill } from 'react-icons/ri'
import { SiSteam } from 'react-icons/si'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { LobbiesAPI } from '@api'
import { AcceptIcon, SupportModal, UserIcon } from '@components'
import { StorageService } from '@services'
import { addToast, toggleFriendList } from '@slices/AppSlice'
import { addInvite } from '@slices/InviteSlice'

import style from './FriendListMenu.module.css'

export default function FriendListMenu({
  open,
  isAvailable,
  user,
  alreadyInvited,
  alreadyOnTeam,
  user_id,
  username,
  steam_url
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [openSupport, setOpenSupport] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userToken = StorageService.get('token')

  const hover =
    'linear-gradient(0deg, rgba(104, 71, 255, 0.30) 0%, rgba(104, 71, 255, 0.30) 100%), #333'

  const menuItems = {
    invite: { icon: BsEnvelopeFill, label: 'Convidar para o grupo' },
    profile: { icon: UserIcon, label: 'Ver perfil' },
    steam: { icon: SiSteam, label: 'Ver perfil na Steam' },
    report: { icon: RiErrorWarningFill, label: 'Reportar usuário' },
  }

  const keys = Object.keys(menuItems)

  const handleInvite = async () => {
    if (!isAvailable || alreadyInvited || alreadyOnTeam) return
    const response = await LobbiesAPI.createInvite(
      userToken,
      user.lobby_id,
      user.id,
      user_id
    )

    if (response.errorMsg)
      dispatch(
        addToast({
          content: response.errorMsg,
          variant: 'error',
        })
      )
    else if (response) {
      dispatch(addInvite(response))
      dispatch(
        addToast({
          title: 'Convite enviado',
          variant: 'success',
        })
      )
    }
  }

  const handleOpenModalSupport = () => {
    setOpenSupport(true)
  }

  const onClickFunction = (key) => {
    switch (key) {
      case 'invite':
        handleInvite()
        break

      case 'profile':
        dispatch(toggleFriendList(false))
        navigate(`/perfil/${user_id}`)
        break

      case 'steam':
        window.open(steam_url, '_blank')
        break

      case 'report':
        handleOpenModalSupport()
        break

      default:
        return null
    }
  }

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <>
      <Menu isOpen={isOpen} placement="left-start">
        <MenuButton
          as={Button}
          variant={'unstyled'}
          rightIcon={<BsThreeDots style={{ margin: '0' }} opacity={0} />}
          minH={0}
          minW={0}
          fontSize={18}
          display="flex"
          color="gray.300"
          alignItems="center"
          _hover={{ color: 'white' }}
          transition="all 0.2s ease-in-out"
          justifyContent="center"
        />
        <MenuList
          border="none"
          p={0}
          overflow="hidden"
          borderRadius={4}
          bg="gray.700"
        >
          {keys.map((key) => (
            <MenuItem
              key={key}
              display="flex"
              alignItems="center"
              bg="gray.700"
              p="12px 18px"
              gap="18px"
              onClick={() => onClickFunction(key)}
              _hover={{ bg: key === 'invite' && alreadyOnTeam ? '' : hover }}
              className={[
                style.menuItem,
                key === 'invite' && alreadyInvited && style.invited,
                key === 'invite' && !isAvailable && style.disabled,
              ].join(' ')}
            >
              <Icon
                as={
                  key === 'invite' && alreadyInvited
                    ? AcceptIcon
                    : menuItems[key].icon
                }
                fill="gray.300"
                color="gray.300"
                fontSize={key === 'report' ? 18 : 16}
                ml={key === 'report' ? '-1px' : 0}
              />

              <Text color="gray.300" fontSize={12} as="span">
                {key === 'invite' && alreadyInvited
                  ? 'Convite enviado!'
                  : menuItems[key].label}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <SupportModal
        isOpen={openSupport}
        setIsOpen={setOpenSupport}
        username={username}
        user_id={user_id}
      />
    </>
  )
}
