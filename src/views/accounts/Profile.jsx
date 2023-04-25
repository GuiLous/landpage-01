import { useSelector } from 'react-redux'

import { Button, Flex } from '@chakra-ui/react'
import { ProfileLayout } from '@layouts'

import { HeaderProfile } from '@components'

import { useState } from 'react'
import style from './Profile.module.css'

export default function ProfileView() {
  const user = useSelector((state) => state.user)

  const [selectedButton, setSelectedButton] = useState('history')

  return (
    <ProfileLayout>
      <Flex className={style.backgroundImg} />
      <Flex direction="column" margin="0 auto">
        <HeaderProfile />

        <Flex align="center" justifyContent="flex-start" gap={4} mt={10}>
          <Button
            w="fit-content"
            variant="secondary"
            fontSize={12}
            fontWeight={600}
            color={selectedButton === 'history' ? 'secondary.400' : 'gray.700'}
            borderColor={
              selectedButton === 'history' ? 'secondary.400' : 'gray.700'
            }
            onClick={() => setSelectedButton('history')}
          >
            HISTÓRICO DE PARTIDAS
          </Button>

          <Button
            w="fit-content"
            variant="secondary"
            fontSize={12}
            fontWeight={600}
            color={selectedButton === 'config' ? 'secondary.400' : 'gray.700'}
            borderColor={
              selectedButton === 'config' ? 'secondary.400' : 'gray.700'
            }
            onClick={() => setSelectedButton('config')}
          >
            CONFIGURAÇÕES
          </Button>
        </Flex>
      </Flex>
    </ProfileLayout>
  )
}
