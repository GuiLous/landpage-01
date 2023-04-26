import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Text,
} from '@chakra-ui/react'

import { Container } from '@components'

import style from './MatchHistoryStatsAccordion.module.css'

export default function MatchHistoryStatsAccordion({ win = false }) {
  return (
    <Accordion
      allowMultiple
      w="full"
      border="1px solid #434343"
      borderRadius={8}
      bgColor="gray.900"
    >
      <AccordionItem pl={3} pr={2} py={3} border="none">
        <Container align="center">
          <Box
            borderRadius={8}
            h="49px"
            as="div"
            w="2px"
            bgColor={win ? 'success' : 'danger.400'}
          />

          <Container className={style.containerInfos}>
            <Container className={style.avatarInfos} gap={8}>
              <Avatar variant="online" size={'md'} src={null} borderWidth={2} />

              <Container column gap={3}>
                <Text
                  as="span"
                  fontSize={14}
                  fontWeight={500}
                  lineHeight="1"
                  letterSpacing="0.5pt"
                  color={win ? 'success' : 'danger.400'}
                >
                  {win ? 'Vitória' : 'Derrota'}
                </Text>
                <Text
                  lineHeight="1"
                  color="gray.700"
                  fontSize={10}
                  fontWeight={500}
                >
                  san andreas
                </Text>
              </Container>
            </Container>

            <Container className={style.resultInfo}>
              <Container>
                <Text
                  as="span"
                  fontSize={18}
                  fontWeight={700}
                  textAlign="center"
                  color="#fff"
                >
                  10
                  <Text
                    pos="relative"
                    top={-1}
                    color="gray.700"
                    fontSize={14}
                    w="14px"
                    as="span"
                    display="inline-block"
                  >
                    :
                  </Text>
                  10
                </Text>
              </Container>

              <Container column>
                <Text as="span" fontSize={12} fontWeight={700} color="#fff">
                  17/17/17
                </Text>
                <Text as="span" color="gray.700" fontSize={10}>
                  1.35 KDA
                </Text>
              </Container>

              <Container column>
                <Text as="span" fontSize={12} fontWeight={700} color="#fff">
                  0.40 KPR
                </Text>
                <Text as="span" color="gray.700" fontSize={10}>
                  72.30 ADR
                </Text>
              </Container>

              <Container column>
                <Text as="span" fontSize={12} fontWeight={700} color="#fff">
                  7.3% HS
                </Text>
                <Text as="span" color="gray.700" fontSize={10}>
                  117 Pontuação média
                </Text>
              </Container>
            </Container>

            <Container className={style.seeMore}>
              <Text as="span" fontSize={10} color="gray.700" mr={1}>
                Abril 8 - 02:24
              </Text>
              <AccordionButton width="fit-content" p={0} color="secondary.400">
                <Text as="span" textAlign="left" fontSize={12}>
                  Ver detalhes
                </Text>
                <AccordionIcon />
              </AccordionButton>
            </Container>
          </Container>
        </Container>

        <AccordionPanel pb={4}>oadslf</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
