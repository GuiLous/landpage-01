import { Text } from '@chakra-ui/react'

import { Container } from '@components'
import { useEffect, useState } from 'react'
import style from './LevelBadge.module.css'

export default function LevelBadge(props) {
  const [image, setImage] = useState(null)

  useEffect(() => {
    const calcLvlRange = () => {
      let range = '0-9'
      if (props.level >= 10) range = '10-19'
      if (props.level >= 20) range = '20-29'
      if (props.level >= 30) range = '30-39'
      if (props.level >= 40) range = '40-49'
      if (props.level >= 50) range = '50'

      return range
    }

    const fetchImg = async () => {
      const response = await import(
        `@assets/images/level_badges/badge_${calcLvlRange()}.png`
      )
      setImage(response.default)
    }

    fetchImg()
  }, [props.level])

  return (
    <Container
      className={[
        style.container,
        props.size ? style[props.size] : style.md,
      ].join(' ')}
      align="center"
      justify="center"
      {...props}
    >
      <img src={image} alt={`Level ${props.level}`} data-testid="badge-image" />
      <Text className={style.txt} data-testid="badge-level">
        {props.level}
      </Text>
    </Container>
  )
}
