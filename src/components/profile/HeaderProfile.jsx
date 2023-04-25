import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import style from './HeaderProfile.module.css'

export default function HeaderProfile() {
  const user = useSelector((state) => state.user)

  return (
    <Flex gap={14} align="flex-end" px={20} flex="1" padding={0}>
      <Flex gap={4}>
        <Avatar
          variant="online"
          width="68px"
          height="68px"
          src={user.account.avatar.medium}
          borderWidth={2}
        />

        <Flex direction="column" gap="2px">
          <Text as="span" fontSize={16} fontWeight={700}>
            {user.account.username} #1607
          </Text>
          <Text as="span" fontSize={14} fontWeight={600}>
            Platinum 20
          </Text>
          <Box className={style.progressBar}>
            <Box className={style.progress} w="30%" />
          </Box>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt="2px"
          >
            <Text as="span" fontSize={10} color="gray.700">
              Classificação de ranking
            </Text>
            <Text as="span" fontSize={10} color="gray.700">
              {user.account.level_points}/100
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex gap={12}>
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text fontSize={14} fontWeight={500} color="gray.700">
            Vitórias
          </Text>
          <Text fontWeight={700} fontSize={16}>
            80
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text fontSize={14} fontWeight={500} color="gray.700">
            Derrotas
          </Text>
          <Text fontWeight={700} fontSize={16}>
            54
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text fontSize={14} fontWeight={500} color="gray.700">
            Abates
          </Text>
          <Text fontWeight={700} fontSize={16}>
            5434
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text fontSize={14} fontWeight={500} color="gray.700">
            Mortes
          </Text>
          <Text fontWeight={700} fontSize={16}>
            1800
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text fontSize={14} fontWeight={500} color="gray.700">
            Assistências
          </Text>
          <Text fontWeight={700} fontSize={16}>
            800
          </Text>
        </Flex>

        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text fontSize={14} fontWeight={500} color="gray.700">
            Headshots
          </Text>
          <Text fontWeight={700} fontSize={16}>
            1200
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
