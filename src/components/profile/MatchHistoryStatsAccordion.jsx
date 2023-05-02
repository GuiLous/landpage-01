import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Text,
} from '@chakra-ui/react'

import { Container } from '@components'

import style from './MatchHistoryStatsAccordion.module.css'

export default function MatchHistoryStatsAccordion() {
  const won = false

  const user = {
    status: 'online',
    account: {
      avatar: {
        medium:
          'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      },
    },
  }

  return (
    <Accordion
      allowMultiple
      w="full"
      border="1px solid #434343"
      borderRadius={8}
      bgColor="gray.900"
    >
      <AccordionItem px="16px" py="18px" border="none">
        <Container align="stretch">
          <Container
            className={[style.borderLeft, won && style.won].join(' ')}
          />

          <Container className={style.leftInfo} gap="10px" align="center">
            <Avatar
              variant={user.status}
              size="lg"
              src={user.account.avatar.medium}
            />

            <Container column gap="8px">
              <Text
                as="span"
                fontSize={20}
                fontWeight={500}
                lineHeight="1"
                letterSpacing="0.5pt"
                color={won ? 'success' : 'danger.400'}
              >
                {won ? 'Vitória' : 'Derrota'}
              </Text>
              <Text
                lineHeight="1"
                color="gray.700"
                fontSize={14}
                fontWeight={500}
              >
                san andreas
              </Text>
            </Container>
          </Container>

          <Container className={style.centerInfo} align="center" gap="32px">
            <Container className={style.statsCenterInfos}>
              <Text
                as="span"
                fontSize={24}
                fontWeight={700}
                textAlign="center"
                color="#fff"
              >
                10
                <Text
                  pos="relative"
                  top={-1}
                  color="gray.700"
                  fontSize={20}
                  w="14px"
                  as="span"
                  display="inline-block"
                >
                  :
                </Text>
                10
              </Text>
            </Container>

            <Container column className={style.statsCenterInfos}>
              <Text
                as="span"
                fontSize={16}
                fontWeight={700}
                color="#fff"
                align="flex-start"
              >
                17/17/17
              </Text>
              <Text
                as="span"
                color="gray.700"
                fontWeight={500}
                fontSize={14}
                align="flex-start"
              >
                1.35 KDA
              </Text>
            </Container>

            <Container column className={style.statsCenterInfos}>
              <Text
                as="span"
                fontSize={16}
                fontWeight={700}
                color="#fff"
                align="flex-start"
              >
                0.40 KPR
              </Text>
              <Text
                as="span"
                color="gray.700"
                fontWeight={500}
                fontSize={14}
                align="flex-start"
              >
                72.30 ADR
              </Text>
            </Container>

            <Container
              column
              style={{ minWidth: '100px' }}
              align="flex-start"
              className={style.statsCenterInfos}
            >
              <Text
                as="span"
                textAlign="left"
                fontSize={16}
                fontWeight={700}
                color="#fff"
              >
                7.3% HS
              </Text>
              <Text
                as="span"
                color="gray.700"
                fontWeight={500}
                fontSize={14}
                align="flex-start"
              >
                117 Pontuação média
              </Text>
            </Container>
          </Container>

          <Container
            className={style.rightInfo}
            column
            align="center"
            justify="center"
          >
            <Text as="span" fontSize={14} fontWeight={500} color="gray.700">
              Abril 8 - 02:24
            </Text>
            <AccordionButton width="fit-content" p={0} color="secondary.400">
              <Text as="span" textAlign="left" fontSize={14}>
                Ver detalhes
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </Container>
        </Container>

        <AccordionPanel>content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
