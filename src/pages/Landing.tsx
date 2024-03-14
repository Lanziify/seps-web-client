import * as Chakra from '@chakra-ui/react'
import Lottie from 'lottie-react'
import lottieData from '../assets/lottieLanding.json'
import {
  IoExtensionPuzzleOutline,
  IoFileTrayFullOutline,
  IoRibbonOutline,
} from 'react-icons/io5'
import flowIdeas from '../assets/flowIdeas.svg'

const Landing = () => {
  const headingSize = Chakra.useBreakpointValue({
    base: '3.441rem',
    sm: '3.441rem',
    md: '3.815rem',
    lg: '3.815rem',
    xl: '3.815rem',
  })
  const svgSize = Chakra.useBreakpointValue({
    base: '200px',
    md: '300px',
    lg: '400px',
    xl: '400px',
  })

  const testimonials = [
    {
      icon: <IoFileTrayFullOutline size={32} />,
      iconColor: 'purple.600',
      iconBackgroundColor: 'purple.100',
      title: 'Data Collection',
      body: `We gather comprehensive data from your school's records, including grades, participation in clubs and organizations, internships, and more.`,
    },
    {
      icon: <IoExtensionPuzzleOutline size={32} />,
      iconColor: 'yellow.600',
      iconBackgroundColor: 'yellow.100',
      title: 'Analysis',
      body: `Our advanced algorithms analyze this data alongside industry trends and job market demands to generate personalized employability profiles for each student.`,
    },
    {
      icon: <IoRibbonOutline size={32} />,
      iconColor: 'teal.600',
      iconBackgroundColor: 'teal.100',
      title: 'Prediction',
      body: `Based on the analysis, we predict the likelihood of each student securing employment in different fields and roles upon graduation.`,
    },
  ]

  return (
    <Chakra.Stack spacing={0}>
      <Chakra.Flex
        height="calc(100vh - 64px)"
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
        <Chakra.Stack maxWidth="2xl">
          <Chakra.Heading
            as="h1"
            fontWeight={900}
            fontSize={headingSize}
            mb={4}
          >
            Predicting Students' Path to Employment
          </Chakra.Heading>

          <Chakra.Text mb={4} lineHeight={2}>
            Are you ready to guide your students towards a future filled with
            opportunities? Our Student Employability Prediction System is here
            to illuminate the path to success!
          </Chakra.Text>
          <Chakra.Button
            variant="solid"
            colorScheme="purple"
            width="fit-content"
            hideBelow="sm"
          >
            Get Started
          </Chakra.Button>
        </Chakra.Stack>
        <Chakra.Box width={{ base: '90%', lg: '55%' }} flexShrink={0}>
          <Lottie loop autoplay animationData={lottieData} />
        </Chakra.Box>
        <Chakra.Button
          variant="solid"
          colorScheme="purple"
          width="fit-content"
          hideFrom="sm"
        >
          Get Started
        </Chakra.Button>
      </Chakra.Flex>
      <Chakra.Box backgroundColor="purple.800">
        <Chakra.Flex
          margin="auto"
          maxWidth="8xl"
          width="full"
          pt={8}
          px={8}
          gap={8}
          alignItems="center"
          justifyContent="space-between"
          direction={{
            base: 'column-reverse',
            lg: 'row',
            md: 'column-reverse',
          }}
        >
          <Chakra.Box
            width={svgSize}
            flexShrink={0}
            alignSelf={{
              base: 'center',
              md: 'center',
              lg: 'flex-end',
              xl: 'flex-end',
            }}
          >
            <Chakra.Image src={flowIdeas} />
          </Chakra.Box>
          <Chakra.Stack mb={4} textColor="white">
            <Chakra.Heading as="h1" fontSize={headingSize} mb={4}>
              Evaluating Student Potential
            </Chakra.Heading>
            <Chakra.Text mb={4} lineHeight={2}>
              Understanding students' potential is paramount to their future
              success, which is why our system evaluates various aspects of each
              student's capabilities comprehensively. We analyze academic
              performance, extracurricular activities, and skill sets to provide
              a holistic view of their strengths and talents. Additionally, we
              take into account students' career interests to tailor our
              predictions and guidance to align with their aspirations. By
              leveraging this multifaceted evaluation approach, we empower
              students to make informed decisions about their academic and
              extracurricular pursuits, guiding them toward a fulfilling and
              successful career path.
            </Chakra.Text>
          </Chakra.Stack>
        </Chakra.Flex>
      </Chakra.Box>

      <Chakra.Stack
        margin="auto"
        maxWidth="8xl"
        width="full"
        alignItems="center"
        justifyContent="center"
        padding={8}
      >
        <Chakra.Heading mb={4}>How Does It Work?</Chakra.Heading>
        <Chakra.SimpleGrid width="full" minChildWidth="20rem" gap={4}>
          {testimonials.map((testimonial, index) => (
            <Chakra.Card key={index} rounded="xl" shadow="lg">
              <Chakra.CardBody>
                <Chakra.Box
                  backgroundColor={testimonial.iconBackgroundColor}
                  width="fit-content"
                  padding={4}
                  rounded="lg"
                  mb={2}
                  textColor={testimonial.iconColor}
                >
                  {testimonial.icon}
                </Chakra.Box>
                <Chakra.Text as="h3" fontSize={20} fontWeight="700">
                  {testimonial.title}
                </Chakra.Text>
                {testimonial.body}
              </Chakra.CardBody>
            </Chakra.Card>
          ))}
        </Chakra.SimpleGrid>
      </Chakra.Stack>
    </Chakra.Stack>
  )
}

export default Landing
