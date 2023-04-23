import { Text } from '@chakra-ui/react'
import React from 'react'

import lvl0To9 from '@assets/images/level_badges/0_9.png'
import lvl10To19 from '@assets/images/level_badges/10_19.png'
import lvl20To29 from '@assets/images/level_badges/20_29.png'
import lvl30To39 from '@assets/images/level_badges/30_39.png'
import lvl40To49 from '@assets/images/level_badges/40_49.png'
import lvl50Up from '@assets/images/level_badges/50.png'
import { Container } from '@components'
import style from './LevelBadge.module.css'

export default function LevelBadge({ level, small, xsmall, xxsmall }) {
  return (
    <Container
      className={[
        style.container,
        small && style.small,
        xsmall && style.xsmall,
        xxsmall && style.xxsmall,
      ].join(' ')}
      align="center"
      justify="center"
    >
      <Container className={style.badge} align="center" justify="center">
        {level <= 9 && <img src={lvl0To9} alt={`Level ${level}`} />}

        {level >= 10 && level <= 19 && (
          <img src={lvl10To19} alt={`Level ${level}`} />
        )}

        {level >= 20 && level <= 29 && (
          <img src={lvl20To29} alt={`Level ${level}`} />
        )}

        {level >= 30 && level <= 39 && (
          <img src={lvl30To39} alt={`Level ${level}`} />
        )}

        {level >= 40 && level <= 49 && (
          <img src={lvl40To49} alt={`Level ${level}`} />
        )}

        {level >= 50 && <img src={lvl50Up} alt={`Level ${level}`} />}
      </Container>

      <Text className={style.level}>{level}</Text>
    </Container>
  )
}
