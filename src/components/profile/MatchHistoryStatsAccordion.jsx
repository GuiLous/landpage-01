import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
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
        <Container align="center" center>
          <Box
            borderRadius={8}
            h="49px"
            as="div"
            w="2px"
            bgColor={win ? 'success' : 'danger.400'}
          />

          <Container className={style.wrapperAvatar}>
            <Flex gap={2} align="center">
              <Avatar
                variant="online"
                width="44px"
                height="44px"
                src={null}
                borderWidth={2}
              />

              <Flex direction="column" gap="3px">
                <Text
                  as="span"
                  color={win ? 'success' : 'danger.400'}
                  fontSize={14}
                  fontWeight={500}
                  lineHeight="1"
                  letterSpacing="0.5pt"
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
              </Flex>
            </Flex>

            <Flex gap={10} align="center">
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

              <Flex direction="column">
                <Text as="span" fontSize={12} fontWeight={700} color="#fff">
                  17/17/17
                </Text>
                <Text as="span" color="gray.700" fontSize={10}>
                  1.35 KDA
                </Text>
              </Flex>

              <Flex direction="column">
                <Text as="span" fontSize={12} fontWeight={700} color="#fff">
                  0.40 KPR
                </Text>
                <Text as="span" color="gray.700" fontSize={10}>
                  72.30 ADR
                </Text>
              </Flex>

              <Flex direction="column">
                <Text as="span" fontSize={12} fontWeight={700} color="#fff">
                  7.3% HS
                </Text>
                <Text as="span" color="gray.700" fontSize={10}>
                  117 Pontuação média
                </Text>
              </Flex>
            </Flex>

            <Flex direction="column" align="flex-end">
              <Text as="span" fontSize={10} color="gray.700" mr={1}>
                Abril 8 - 02:24
              </Text>
              <AccordionButton width="fit-content" p={0} color="secondary.400">
                <Text as="span" textAlign="left" fontSize={12}>
                  Ver detalhes
                </Text>
                <AccordionIcon />
              </AccordionButton>
            </Flex>
          </Container>
        </Container>

        <AccordionPanel pb={4}>oadslf</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
