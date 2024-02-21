import * as Chakra from '@chakra-ui/react'
// import React from 'react'
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

  const handleSubmitForm = async (values: Features) => {
    try {
      const { studentId, ...formData } = values
      const data = Object.values(formData)
      const response = await customAxios.post(
        '/predict',
        {
          input: data,
        },
        {
          headers: {
            Authorization: token?.accessToken,
          },
        }
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Chakra.Flex bg="gray.100" align="center" justify="center">
      <Chakra.Box bg="white" p={6} w={620}>
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
                  evaluation will contribute significantly to the accuracy of
                  our predictive model and the enhancement of students' future
                  career prospects.
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
                    type="number"
                    focusBorderColor="purple.500"
                    onChange={handleChange}
                    disabled={isSubmitting}
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
                            <Chakra.Th
                              key={i}
                              textAlign={'center'}
                              fontSize={16}
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
                  Please rate each category on a scale of 1 to 5, with 1 being
                  the lowest and 5 being the highest.
                </Chakra.Text>

                {featuresItems.map((feature, i) => (
                  <Chakra.FormControl
                    key={i}
                    isInvalid={
                      !!errors[feature.name] && !!touched[feature.name]
                    }
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
              </Chakra.Stack>
            </Form>
          )}
        </Formik>
      </Chakra.Box>
    </Chakra.Flex>
  )
}

export default AssessmentForm
