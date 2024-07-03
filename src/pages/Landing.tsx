import * as Chakra from '@chakra-ui/react'
import Lottie from 'lottie-react'
import lottieData from '../assets/lottieLanding.json'
import {
  IoExtensionPuzzleOutline,
  IoFileTrayFullOutline,
  IoRibbonOutline,
} from 'react-icons/io5'
import flowIdeas from '../assets/flowIdeas.svg'
import { motion } from 'framer-motion'
import { defaultFade, itemPopUp } from '../animations/animations'

const Landing = () => {
  const workGuide = [
    {
      icon: <IoFileTrayFullOutline size={32} />,
      iconColor: 'purple.600',
      iconBackgroundColor: 'purple.200',
      cardBackgroundColor: 'purple.100',
      color: 'black',
      title: 'Data Collection',
      body: `We gather comprehensive data from your school's records, including grades, participation in clubs and organizations, internships, and more.`,
    },
    {
      icon: <IoExtensionPuzzleOutline size={32} />,
      iconColor: 'purple.600',
      iconBackgroundColor: 'purple.300',
      cardBackgroundColor: 'purple.200',
      color: 'black',
      title: 'Analysis',
      body: `Our advanced algorithms analyze this data alongside industry trends and job market demands to generate personalized employability profiles for each student.`,
    },
    {
      icon: <IoRibbonOutline size={32} />,
      iconColor: 'white',
      iconBackgroundColor: 'purple.300',
      cardBackgroundColor: 'purple.600',
      color: 'white',
      title: 'Prediction',
      body: `Based on the analysis, we predict the likelihood of each student securing employment in different fields and roles upon graduation.`,
    },
  ]


  return (
    <Chakra.Stack spacing={0}>
      <Chakra.Flex
        minHeight="calc(100vh - 64px)"
        margin="auto"
        maxWidth="8xl"
        alignItems="center"
        justifyContent="center"
        padding={8}
        direction={{
          base: 'column',
          lg: 'row',
          md: 'column',
        }}
        gap={8}
      >
        <Chakra.Box
          as={motion.div}
          initial="initial"
          whileInView="animate"
          variants={defaultFade}
        >
          <Chakra.Heading
            as={motion.h1}
            variants={itemPopUp}
            fontWeight={900}
            fontSize={{ base: '4xl', md: '6xl', xl: '6xl' }}
            mb={4}
          >
            Predicting Students' Path to Employment
          </Chakra.Heading>
          <Chakra.Text as={motion.p} variants={itemPopUp} mb={4} lineHeight={2}>
            Are you ready to guide your students towards a future filled with
            opportunities? Our Student Employability Prediction System is here
            to illuminate the path to success!
          </Chakra.Text>
          <Chakra.Button
            as={motion.button}
            variants={itemPopUp}
            colorScheme="purple"
            width="fit-content"
          >
            Get Started
          </Chakra.Button>
        </Chakra.Box>

        <Chakra.Box
          as={motion.div}
          initial="initial"
          whileInView="animate"
          variants={itemPopUp}
          width={{ base: '90%', lg: '55%' }}
          flexShrink={0}
        >
          <Lottie loop autoplay animationData={lottieData} />
        </Chakra.Box>
      </Chakra.Flex>
      <Chakra.Box backgroundColor="purple.800" overflow="hidden">
        <Chakra.Grid
          templateColumns="repeat(3, 3fr)"
          margin="auto"
          maxWidth="8xl"
        >
          <Chakra.GridItem
            rowSpan={{ md: 0, lg: 0, xl: 2 }}
            colSpan={{ base: 3, sm: 3, md: 0, lg: 1, xl: 1 }}
            gridRowStart={{ base: 3, sm: 3, md: 3, lg: 2, xl: 1 }}
            display="flex"
          >
            <Chakra.Box
              as={motion.div}
              bottom={0}
              margin={{
                base: 'auto',
                sm: 'auto',
                md: 'auto',
                lg: 'unset',
                xl: 'unset',
              }}
              initial="initial"
              whileInView="animate"
              variants={itemPopUp}
              width={{
                base: '200px',
                md: '300px',
                lg: 'md',
                xl: 'full',
              }}
              alignSelf="end"
              padding='1rem 1rem 0rem 1rem'
            >
              <Chakra.Image src={flowIdeas} width="full" height="full" />
            </Chakra.Box>
          </Chakra.GridItem>
          <Chakra.GridItem
            colSpan={{ base: 3, sm: 3, md: 0, lg: 3, xl: 2 }}
            padding={8}
          >
            <Chakra.Box textColor="white">
              <Chakra.Heading
                as={motion.h1}
                initial="initial"
                whileInView="animate"
                variants={itemPopUp}
                fontSize={{ base: '4xl', md: '6xl', xl: '6xl' }}
                mb={4}
              >
                Evaluating Student Potential
              </Chakra.Heading>
              <Chakra.Text
                as={motion.p}
                initial="initial"
                whileInView="animate"
                variants={itemPopUp}
                lineHeight={2}
              >
                Understanding students' potential is paramount to their future
                success, which is why our system evaluates various aspects of
                each student's capabilities comprehensively. We analyze academic
                performance, extracurricular activities, and skill sets to
                provide a holistic view of their strengths and talents.
                Additionally, we take into account students' career interests to
                tailor our predictions and guidance to align with their
                aspirations. By leveraging this multifaceted evaluation
                approach, we empower students to make informed decisions about
                their academic and extracurricular pursuits, guiding them toward
                a fulfilling and successful career path.
              </Chakra.Text>
            </Chakra.Box>
          </Chakra.GridItem>

          <Chakra.GridItem
            colSpan={{ base: 3, sm: 3, md: 3, lg: 2, xl: 2 }}
            padding={4}
            gridRowStart={{ base: 2, sm: 2, md: 2 }}
          >
            <Chakra.Box>
              <Chakra.Heading
                as={motion.h1}
                initial="initial"
                whileInView="animate"
                variants={itemPopUp}
                marginBottom={8}
                textAlign="center"
                color="white"
              >
                How Does It Work?
              </Chakra.Heading>
              <Chakra.SimpleGrid
                width="full"
                minChildWidth={{
                  base: '',
                  md: '10rem',
                  lg: '15rem',
                  xl: '15rem',
                }}
                gap={4}
              >
                {workGuide.map((item, index) => (
                  <Chakra.Card
                    key={index}
                    as={motion.h1}
                    initial="initial"
                    whileInView="animate"
                    variants={itemPopUp}
                    rounded="xl"
                    height="full"
                    shadow="xl"
                    backgroundColor={item.cardBackgroundColor}
                    color={item.color}
                  >
                    <Chakra.CardBody>
                      <Chakra.Box
                        backgroundColor={item.iconBackgroundColor}
                        width="fit-content"
                        padding={4}
                        rounded="lg"
                        mb={2}
                        textColor={item.iconColor}
                      >
                        {item.icon}
                      </Chakra.Box>
                      <Chakra.Text as="h3" fontSize={20} fontWeight="700">
                        {item.title}
                      </Chakra.Text>
                      {item.body}
                    </Chakra.CardBody>
                  </Chakra.Card>
                ))}
              </Chakra.SimpleGrid>
            </Chakra.Box>
          </Chakra.GridItem>
        </Chakra.Grid>
      </Chakra.Box>
    </Chakra.Stack>
  )
}

export default Landing
