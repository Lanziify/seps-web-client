import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import { Field, Form, Formik, FormikProps } from 'formik'
import { AssessmentFormSchema } from '../utils/validation'
import { InitialFeatureValues } from '../data/InitialFeatureValues'
import useAxiosInterceptor from '../hooks/useAxiosInterceptor'
import { useAuth } from '../context/AuthContext'
import { likertScale } from '../data/likertScale'
import LottieLoading from './LottieLoading'

interface Features {
  [key: string]: string | number
}

const AssessmentForm = () => {
  const { token } = useAuth()
  const cancelRef = React.useRef(null)
  const customAxios = useAxiosInterceptor()
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure()
  const [alertContent, setAlertContent] = React.useState<{
    title: string
    body: string
    isResponse: boolean
  } | null>({
    title: '',
    body: '',
    isResponse: false,
  })

  const handleSubmitForm = async (
    event: React.MouseEvent<Element>,
    values: Features,
    props: FormikProps<Features>
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

      props.setSubmitting(true)

      if (features.includes(0) || Object.keys(props.errors).length > 0) {
        setAlertContent({
          title: 'Form Error',
          body: 'It seeems like you are trying to submit a form with invalid or empty fields. Please try again.',
          isResponse: false,
        })
        props.setSubmitting(false)
        return
      }

      const response = await customAxios.post(
        (event.target as HTMLElement).id === 'upload'
          ? '/upload'
          : '/upload_predict',
        {
          studentId: values.studentId,
          features: features,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      setAlertContent({
        title: response.data.title,
        body: response.data.message,
        isResponse: true,
      })

      props.resetForm()
      props.setSubmitting(false)
    } catch (error: any) {
      setAlertContent({
        title: error.title,
        body: error.message,
        isResponse: true,
      })
      props.setSubmitting(false)
    }
  }

  const handleOptionButtonClick = () => {
    onOpen()
    setAlertContent({
      title: 'Select options',
      body: 'Please select an option',
      isResponse: false,
    })
  }

  const renderModalContent = () => {
    if (alertContent?.body) {
      return (
        <div dangerouslySetInnerHTML={{ __html: alertContent?.body }}></div>
      )
    } else {
      return null
    }
  }

  const handleMouseEvents = (event: React.MouseEvent, isVisible: boolean) => {
    const card = event.currentTarget.getBoundingClientRect()
    const mouseX = event.clientX - card.left
    const mouseY = event.clientY - card.top

    const childElement = event.currentTarget.children[3] as HTMLElement

    childElement.style.transition =
      'width 0.4s, height 0.4s, opacity 0.4s, visibility 0.4s'

    if (!childElement.style.width || !childElement.style.height) {
      childElement.style.width = '0px'
      childElement.style.height = '0px'
      childElement.style.transition = 'width 0.4s, height 0.4s, opacity 0.4s, visibility 0.4s'
    }

    childElement.style.visibility = isVisible ? 'visible' : 'hidden'
    childElement.style.opacity = isVisible ? '1' : '0'
    childElement.style.width = isVisible
      ? `${event.currentTarget.scrollWidth * 2.5}px`
      : '0px'
    childElement.style.height = isVisible
      ? `${event.currentTarget.scrollWidth * 2.5}px`
      : '0px'
    childElement.style.top = mouseY + 'px'
    childElement.style.left = mouseX + 'px'
  }

  return (
    <Chakra.Box bg="white" p={6}>
      <Formik
        initialValues={InitialFeatureValues}
        validationSchema={AssessmentFormSchema}
        enableReinitialize={true}
        onSubmit={() => {}}
      >
        {(formikProps) => (
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
                isInvalid={
                  !!formikProps.errors.studentId &&
                  !!formikProps.touched.studentId
                }
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
                  onChange={formikProps.handleChange}
                  disabled={formikProps.isSubmitting}
                  autoFocus
                />
                <Chakra.FormErrorMessage>
                  {formikProps.errors.studentId}
                </Chakra.FormErrorMessage>
              </Chakra.FormControl>

              {likertScale.map((feature, i) => (
                <Chakra.FormControl
                  key={i}
                  isInvalid={
                    !!formikProps.errors[feature.name] &&
                    !!formikProps.touched[feature.name]
                  }
                >
                  <Chakra.RadioGroup
                    key={i}
                    value={String(formikProps.values[feature.name])}
                  >
                    <Chakra.Heading as="h6" size="md">
                      {feature.label}
                    </Chakra.Heading>
                    <Chakra.Text marginBottom={2}>
                      {feature.description}
                    </Chakra.Text>

                    <Chakra.SimpleGrid
                      minChildWidth="200px"
                      gap={4}
                      marginTop={8}
                      marginBottom={8}
                    >
                      {Object.entries(feature.scales).map(
                        ([scaleKey, scaleValue], j) => (
                          <Chakra.Card
                            key={j}
                            alignItems="center"
                            wordBreak="break-word"
                            padding={2}
                            onClick={() => {
                              if (formikProps.isSubmitting) return
                              formikProps.setFieldValue(feature.name, j + 1)
                            }}
                            transition="all 0.3s"
                            _hover={{
                              color: 'white',
                            }}
                            style={{
                              backgroundColor:
                                formikProps.values[feature.name] === j + 1
                                  ? '#9F7AEA'
                                  : '',
                              color:
                                formikProps.values[feature.name] === j + 1
                                  ? 'white'
                                  : '',
                            }}
                            cursor="pointer"
                            gap={2}
                            position="relative"
                            overflow="hidden"
                            onMouseEnter={(event) =>
                              handleMouseEvents(event, true)
                            }
                            onMouseLeave={(event) =>
                              handleMouseEvents(event, false)
                            }
                          >
                            <Chakra.Text
                              textAlign="center"
                              fontSize="md"
                              textTransform="capitalize"
                              fontWeight="bold"
                              zIndex={1}
                              pointerEvents="none"
                            >
                              {scaleKey}
                            </Chakra.Text>
                            <Chakra.Radio
                              id={`${feature.id}-r:${j}`}
                              value={String(j + 1)}
                              colorScheme="white"
                              disabled={formikProps.isSubmitting}
                              zIndex={1}
                              pointerEvents="none"
                            />
                            <Chakra.Text
                              textAlign="center"
                              fontSize="sm"
                              zIndex={1}
                              pointerEvents="none"
                            >
                              {scaleValue}
                            </Chakra.Text>
                            <div className="absolute rounded-full bg-[#9F7AEA]  -translate-x-1/2 -translate-y-1/2 z-0" />
                          </Chakra.Card>
                        )
                      )}
                    </Chakra.SimpleGrid>
                  </Chakra.RadioGroup>
                  <Chakra.FormErrorMessage>
                    {formikProps.errors[feature.name]}
                  </Chakra.FormErrorMessage>
                </Chakra.FormControl>
              ))}
              <Chakra.Button
                colorScheme="purple"
                isDisabled={
                  formikProps.isSubmitting ||
                  Object.keys(formikProps.errors).length > 0
                }
                isLoading={formikProps.isSubmitting}
                onClick={() => {
                  if (Object.keys(formikProps.errors).length === 0) {
                    handleOptionButtonClick()
                  }
                }}
              >
                Submit
              </Chakra.Button>

              <Chakra.AlertDialog
                motionPreset="scale"
                leastDestructiveRef={cancelRef}
                closeOnEsc={!alertContent?.isResponse}
                closeOnOverlayClick={!alertContent?.isResponse}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <Chakra.AlertDialogOverlay
                  bg="blackAlpha.300"
                  backdropFilter="blur(10px)"
                />
                <Chakra.AlertDialogContent
                  width={formikProps.isSubmitting ? 'fit-content' : 'inherit'}
                  margin={8}
                >
                  <Chakra.AlertDialogCloseButton
                    hidden={formikProps.isSubmitting}
                    onClick={() => {
                      formikProps.setSubmitting(false)
                    }}
                  />
                  {!formikProps.isSubmitting && (
                    <Chakra.AlertDialogHeader>
                      {alertContent?.title}
                    </Chakra.AlertDialogHeader>
                  )}
                  <Chakra.AlertDialogBody>
                    {formikProps.isSubmitting ? (
                      <Chakra.Stack padding={12}>
                        <LottieLoading />
                      </Chakra.Stack>
                    ) : (
                      renderModalContent()
                    )}
                  </Chakra.AlertDialogBody>
                  {!formikProps.isSubmitting && (
                    <Chakra.AlertDialogFooter>
                      <Chakra.Stack
                        hidden={alertContent?.isResponse}
                        flexGrow={1}
                      >
                        <Chakra.Button
                          id="upload"
                          variant="solid"
                          type="submit"
                          onClick={(event: React.MouseEvent<Element>) =>
                            handleSubmitForm(
                              event,
                              formikProps.values,
                              formikProps
                            )
                          }
                        >
                          Upload
                        </Chakra.Button>
                        <Chakra.Button
                          id="upload_predict"
                          variant="solid"
                          colorScheme="purple"
                          onClick={(event: React.MouseEvent<Element>) =>
                            handleSubmitForm(
                              event,
                              formikProps.values,
                              formikProps
                            )
                          }
                        >
                          Upload and Predict
                        </Chakra.Button>
                      </Chakra.Stack>
                      {alertContent?.isResponse && (
                        <Chakra.Button
                          ref={cancelRef}
                          onClick={() => {
                            onClose()
                            setAlertContent({
                              title: '',
                              body: '',
                              isResponse: false,
                            })
                          }}
                          colorScheme="purple"
                        >
                          Okay
                        </Chakra.Button>
                      )}
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
