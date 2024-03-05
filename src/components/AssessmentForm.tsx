import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { AssessmentFormSchema } from '../utils/validation'
import { InitialFeatureValues } from '../data/InitialFeatureValues'
import { featuresItems } from '../data/FeatureItems'
import useAxiosInterceptor from '../hooks/useAxiosInterceptor'
import { useAuth } from '../context/AuthContext'

interface Features {
  [key: string]: string | number
}

const AssessmentForm = () => {
  const { token } = useAuth()
  const cancelRef = React.useRef(null)
  const customAxios = useAxiosInterceptor()
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure()
  const [modalContent, setModalContent] = React.useState<{
    title: string
    body: string
  } | null>({
    title: '',
    body: '',
  })

  const handleSubmitForm = async (
    values: Features,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const features = []

      features.push(values.general_appearance)
      features.push(values.manner_of_speaking)
      features.push(values.physical_condition)
      features.push(values.mental_alertness)
      features.push(values.self_confidence)
      features.push(values.ability_to_present_ideas)
      features.push(values.communication_skills)
      features.push(values.performance_rating)
      onOpen()
      const response = await customAxios.post(
        '/dataset/upload',
        {
          studentId: values.studentId,
          features: features,
        },
        {
          headers: {
            Authorization: token?.accessToken,
          },
        }
      )
      setModalContent({
        title: response.data.title,
        body: response.data.message,
      })
      resetForm()
      setSubmitting(true)
    } catch (error: any) {
      setModalContent({
        title: error.title,
        body: error.message,
      })
    }
  }

  return (
    <Chakra.Box bg="white" p={6}>
      <Formik
        initialValues={InitialFeatureValues}
        validationSchema={AssessmentFormSchema}
        enableReinitialize={true}
        onSubmit={handleSubmitForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form>
            <Chakra.Stack spacing={3}>
              <Chakra.Heading
                as="h1"
                size="xl"
                fontWeight={900}
                textAlign="center"
              >
                Student Employability Prediction Form
              </Chakra.Heading>
              <Chakra.Text textAlign="center" marginBottom={12}>
                This form is designed to assess various aspects of student
                performance and presentation skills. Please carefully evaluate
                each category based on the given criteria. Your detailed
                evaluation will contribute significantly to the accuracy of our
                predictive model and the enhancement of students' future career
                prospects.
              </Chakra.Text>

              <Chakra.FormControl
                isInvalid={!!errors.studentId && !!touched.studentId}
                marginBottom={4}
              >
                <Chakra.FormLabel
                  htmlFor="studentId"
                  fontSize={'xl'}
                  fontWeight={700}
                >
                  Student ID
                </Chakra.FormLabel>

                <Field
                  as={Chakra.Input}
                  id="studentId"
                  name="studentId"
                  variant="outline"
                  borderColor="gray.300"
                  focusBorderColor="purple.500"
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoFocus
                />
                <Chakra.FormErrorMessage>
                  {errors.studentId}
                </Chakra.FormErrorMessage>
              </Chakra.FormControl>

              <Chakra.TableContainer background="gray.500" rounded="xl">
                <Chakra.Table variant="simple">
                  <Chakra.TableCaption
                    margin={0}
                    color="white"
                    background="gray.600"
                  >
                    Rating Scale
                  </Chakra.TableCaption>
                  <Chakra.Thead>
                    <Chakra.Tr>
                      {Array(5)
                        .fill(undefined)
                        .map((_, i) => (
                          <Chakra.Th
                            key={i}
                            textAlign={'center'}
                            fontSize={16}
                            color="white"
                            borderLeftWidth={1}
                          >
                            {i + 1}
                          </Chakra.Th>
                        ))}
                    </Chakra.Tr>
                  </Chakra.Thead>
                  <Chakra.Tbody>
                    <Chakra.Tr>
                      {Array(5)
                        .fill(undefined)
                        .map((_, i) => (
                          <Chakra.Td
                            key={i}
                            textAlign={'center'}
                            borderLeftWidth={1}
                          >
                            <Chakra.Radio
                              borderColor="white"
                              isChecked={false}
                            />
                          </Chakra.Td>
                        ))}
                    </Chakra.Tr>
                  </Chakra.Tbody>
                </Chakra.Table>
              </Chakra.TableContainer>

              <Chakra.Text textAlign="center" fontWeight={700} marginBottom={8}>
                Please rate each category on a scale of 1 to 5, with 1 being the
                lowest and 5 being the highest.
              </Chakra.Text>

              {featuresItems.map((feature, i) => (
                <Chakra.FormControl
                  key={i}
                  isInvalid={!!errors[feature.name] && !!touched[feature.name]}
                >
                  <Chakra.RadioGroup
                    key={i}
                    value={String(values[feature.name])}
                  >
                    <Chakra.Heading as="h6" size="md">
                      {feature.label}
                    </Chakra.Heading>
                    <Chakra.Text marginBottom={2}>
                      {feature.description}
                    </Chakra.Text>
                    <Chakra.Stack
                      direction="row"
                      justifyContent="space-around"
                      padding={4}
                      rounded={8}
                    >
                      {Array(5)
                        .fill(undefined)
                        .map((_, j) => (
                          <Chakra.Radio
                            id={`${feature.id}-r:${j}`}
                            key={j}
                            value={String(j + 1)}
                            borderColor="gray.400"
                            colorScheme="purple"
                            onChange={() => {
                              if (isSubmitting) return
                              setFieldValue(feature.name, j + 1)
                            }}
                            disabled={isSubmitting}
                          />
                        ))}
                    </Chakra.Stack>
                  </Chakra.RadioGroup>
                  <Chakra.FormErrorMessage>
                    {errors[feature.name]}
                  </Chakra.FormErrorMessage>
                </Chakra.FormControl>
              ))}
              <Chakra.Button
                colorScheme="purple"
                type="submit"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Submit
              </Chakra.Button>

              <Chakra.AlertDialog
                motionPreset="scale"
                leastDestructiveRef={cancelRef}
                closeOnEsc={false}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <Chakra.AlertDialogOverlay
                  bg="blackAlpha.300"
                  backdropFilter="blur(10px)"
                />
                <Chakra.AlertDialogContent
                  width={isSubmitting ? 'fit-content' : 'inherit'}
                >
                  {!isSubmitting && (
                    <Chakra.AlertDialogHeader>
                      {modalContent?.title}
                    </Chakra.AlertDialogHeader>
                  )}
                  <Chakra.AlertDialogBody>
                    {isSubmitting ? (
                      <Chakra.Spinner size="xl" margin="auto" />
                    ) : (
                      <Chakra.Text>{modalContent?.body}</Chakra.Text>
                    )}
                  </Chakra.AlertDialogBody>
                  {!isSubmitting && (
                    <Chakra.AlertDialogFooter>
                      <Chakra.Button
                        ref={cancelRef}
                        onClick={onClose}
                        isDisabled={isSubmitting}
                        colorScheme="purple"
                      >
                        Confirm
                      </Chakra.Button>
                    </Chakra.AlertDialogFooter>
                  )}
                </Chakra.AlertDialogContent>
              </Chakra.AlertDialog>
            </Chakra.Stack>
          </Form>
        )}
      </Formik>
    </Chakra.Box>
  )
}

export default AssessmentForm
