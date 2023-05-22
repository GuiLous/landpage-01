import { Container, ProfileCard } from '@components'

import { Image, Text } from '@chakra-ui/react'
import style from './FavoriteWeaponCard.module.css'

export default function FavoriteWeaponCard({ weapon }) {
  return (
    <ProfileCard title="Arma favorita">
      <Container className={style.container} column gap={24}>
        <Container className={style.avatar} justify="center">
          <Image src={weapon.avatar} />
        </Container>

        <Container className={style.info} column>
          <Container className={style.name} justify="center">
            <Text fontWeight="bold" fontSize={14}>
              {weapon.name}
            </Text>
          </Container>
          <Container className={style.meta} justify="center">
            <Text fontSize={12} color="gray.700">
              {weapon.type}
            </Text>
          </Container>
        </Container>

        <Container className={style.stats}>
          <Container column className={style.weaponStat}>
            <Text fontWeight="medium" fontSize={12} color="gray.700">
              Abates
            </Text>
            <Text fontWeight="semibold" fontSize={16} color="white">
              {weapon.stats.kills}
            </Text>
          </Container>

          <Container column className={style.weaponStat}>
            <Text fontWeight="medium" fontSize={12} color="gray.700">
              Assistências
            </Text>
            <Text fontWeight="semibold" fontSize={16} color="white">
              {weapon.stats.assists}
            </Text>
          </Container>

          <Container column className={style.weaponStat}>
            <Text fontWeight="medium" fontSize={12} color="gray.700">
              Headshots
            </Text>
            <Text fontWeight="semibold" fontSize={16} color="white">
              {weapon.stats.head_shots}
            </Text>
          </Container>

          <Container column className={style.weaponStat}>
            <Text fontWeight="medium" fontSize={12} color="gray.700">
              Precisão
            </Text>
            <Text>
              {(weapon.stats.shots_fired / weapon.stats.hit_shots).toFixed(2)}
            </Text>
          </Container>

          <Container column className={style.weaponStat}>
            <Text fontWeight="medium" fontSize={12} color="gray.700">
              Partidas
            </Text>
            <Text fontWeight="semibold" fontSize={16} color="white">
              {weapon.stats.matches}
            </Text>
          </Container>

          <Container column className={style.weaponStat}>
            <Text fontWeight="medium" fontSize={12} color="gray.700">
              Vitórias
            </Text>
            <Text fontWeight="semibold" fontSize={16} color="white">
              {weapon.stats.wins}
            </Text>
          </Container>
        </Container>
      </Container>
    </ProfileCard>
  )
}
