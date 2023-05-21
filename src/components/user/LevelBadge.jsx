import { Text } from '@chakra-ui/react'

import { Container } from '@components'
import { useEffect, useState } from 'react'
import style from './LevelBadge.module.css'

export default function LevelBadge(props) {
  const [image, setImage] = useState(null)
  const size = !props.fitParent && (props.size || 'md')

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

    setImage(
      <img
        src={require(`@assets/images/level_badges/badge_${calcLvlRange()}.png`)}
        alt={`Level ${props.level}`}
        data-testid="badge-image"
      />
    )

    // const fetchImg = async () => {
    //   const response = await import(
    //     `@assets/images/level_badges/badge_${calcLvlRange()}.png`
    //   )
    //   setImage(response.default)
    // }

    // const response = import(
    //   `@assets/images/level_badges/badge_${calcLvlRange()}.png`
    // )

    // fetchImg()
  }, [props.level])

  return (
    <Container
      className={[
        style.container,
        size && style[size],
        props.fitParent && style.fitParent,
      ].join(' ')}
      align="center"
      justify="center"
      {...props}
    >
      <Container className={style.txtWrapper} align="center" justify="center">
        <Text
          data-testid="badge-level"
          className={style.txt}
          fontWeight="bold"
          fontSize={props.fitParent && props.fontSize}
          position="relative"
          top={`${props.textYPosition}px`}
          left={`${props.textXPosition}px`}
          color="white"
        >
          {props.level}
        </Text>
      </Container>
      {image}
    </Container>
  )
}
