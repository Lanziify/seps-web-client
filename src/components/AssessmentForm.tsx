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
      setSubmitting(false)
    } catch (error) {
      console.log(error)
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
              <Chakra.Heading as="h1" size="xl" textAlign="center">
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

              <Chakra.TableContainer borderWidth={1} rounded="md">
                <Chakra.Table variant="simple">
                  <Chakra.TableCaption margin={0}>
                    Rating Scale
                  </Chakra.TableCaption>
                  <Chakra.Thead>
                    <Chakra.Tr>
                      {Array(5)
                        .fill(undefined)
                        .map((_, i) => (
                          <Chakra.Th key={i} textAlign={'center'} fontSize={16}>
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
                          <Chakra.Td key={i} textAlign={'center'}>
                            <Chakra.Radio
                              borderColor="gray.400"
                              isChecked={false}
                            />
                          </Chakra.Td>
                        ))}
                    </Chakra.Tr>
                  </Chakra.Tbody>
                </Chakra.Table>
              </Chakra.TableContainer>

              <Chakra.Text
                textAlign="center"
                fontSize={12}
                fontWeight={700}
                marginBottom={2}
              >
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

              <Chakra.Modal isCentered isOpen={isOpen} onClose={onClose}>
                <Chakra.ModalOverlay
                  bg="blackAlpha.300"
                  backdropFilter="blur(10px)"
                />
                <Chakra.ModalContent
                  width={isSubmitting ? 'fit-content' : 'inherit'}
                >
                  {!isSubmitting && (
                    <Chakra.ModalHeader>
                      {modalContent?.title}
                    </Chakra.ModalHeader>
                  )}
                  {!isSubmitting && (
                    <Chakra.ModalCloseButton
                      onClick={() => {
                        setModalContent(null)
                      }}
                    />
                  )}
                  <Chakra.ModalBody>
                    {isSubmitting ? (
                      <Chakra.Spinner size="xl" />
                    ) : (
                      <Chakra.Text>{modalContent?.body}</Chakra.Text>
                    )}
                  </Chakra.ModalBody>
                  <Chakra.ModalFooter>
                    {!isSubmitting && (
                      <Chakra.Button colorScheme="purple" onClick={onClose}>
                        Confirm
                      </Chakra.Button>
                    )}
                  </Chakra.ModalFooter>
                </Chakra.ModalContent>
              </Chakra.Modal>
            </Chakra.Stack>
          </Form>
        )}
      </Formik>
    </Chakra.Box>
  )
}

export default AssessmentForm
