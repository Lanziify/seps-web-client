import * as Chakra from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { regex } from '../strings/regex'
import {
  MdLockOutline,
  MdOutlineAlternateEmail,
  MdPersonOutline,
} from 'react-icons/md'

interface RegistrationValues {
  username: string
  email: string
  password: string
}

interface RegistrationResponse {
  title: string
  message: string
}

const RegisterUser: React.FC = () => {
  const [regisrationResponse, setRegisrationResponse] =
    React.useState<RegistrationResponse | null>(null)

  const handleSubmit = async (values: RegistrationValues) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/register`,
        {
          ...values,
        }
      )
      setRegisrationResponse(response.data)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log('An error occurred:', error)
      }
    }
  }

  const registrationValidationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .required('Email is required')
      .matches(regex.emailRegex, 'Invalid email address'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        regex.passwordRegex,
        'Password must be eight characters long, at least one letter and one number'
      ),
  })

  return (
    <Chakra.Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Chakra.Box bg="white" p={6} rounded="md" margin={8} w={420}>
        {regisrationResponse ? (
          <>
            <Chakra.Heading
              as="h1"
              size="xl"
              marginBottom={2}
              textAlign="center"
              color="teal.400"
            >
              {regisrationResponse.title}
            </Chakra.Heading>
            <p className="text-sm text-center">{regisrationResponse.message}</p>
          </>
        ) : (
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={registrationValidationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, isSubmitting }) => (
              <Form>
                <Chakra.Stack padding={3} spacing={3}>
                  <Chakra.Heading as="h1" size="2xl" color="teal.400">
                    Register
                  </Chakra.Heading>
                  <Chakra.FormControl
                    isInvalid={!!errors.username && !!touched.username}
                    isRequired
                  >
                    <Chakra.FormLabel htmlFor="username">Username</Chakra.FormLabel>
                    <Chakra.InputGroup>
                      <Chakra.InputLeftAddon
                        border={0}
                        background="purple.500"
                        color="white"
                      >
                        <MdPersonOutline />
                      </Chakra.InputLeftAddon>
                      <Field
                        as={Chakra.Input}
                        id="username"
                        name="username"
                        variant="filled"
                        type="text"
                        focusBorderColor="purple.500"
                        roundedStart={0}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </Chakra.InputGroup>
                    <Chakra.FormErrorMessage>{errors.username}</Chakra.FormErrorMessage>
                  </Chakra.FormControl>

                  <Chakra.FormControl
                    isInvalid={!!errors.email && !!touched.email}
                    isRequired
                  >
                    <Chakra.FormLabel htmlFor="email">Email</Chakra.FormLabel>
                    <Chakra.InputGroup>
                      <Chakra.InputLeftAddon
                        border={0}
                        background="purple.500"
                        color="white"
                      >
                        <MdOutlineAlternateEmail />
                      </Chakra.InputLeftAddon>
                      <Field
                        as={Chakra.Input}
                        id="email"
                        name="email"
                        variant="filled"
                        type="email"
                        focusBorderColor="purple.500"
                        roundedStart={0}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </Chakra.InputGroup>
                    <Chakra.FormErrorMessage>{errors.email}</Chakra.FormErrorMessage>
                  </Chakra.FormControl>

                  <Chakra.FormControl
                    isInvalid={!!errors.password && !!touched.password}
                    isRequired
                  >
                    <Chakra.FormLabel htmlFor="password">Password</Chakra.FormLabel>
                    <Chakra.InputGroup>
                      <Chakra.InputLeftAddon
                        border={0}
                        background="purple.500"
                        color="white"
                      >
                        <MdLockOutline />
                      </Chakra.InputLeftAddon>
                      <Field
                        as={Chakra.Input}
                        id="password"
                        name="password"
                        variant="filled"
                        type="password"
                        focusBorderColor="purple.500"
                        roundedStart={0}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </Chakra.InputGroup>
                    <Chakra.FormErrorMessage>{errors.password}</Chakra.FormErrorMessage>
                  </Chakra.FormControl>

                  <Chakra.FormControl
                    isInvalid={
                      !!errors.confirmPassword && !!touched.confirmPassword
                    }
                    isRequired
                  >
                    <Chakra.FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </Chakra.FormLabel>
                    <Chakra.InputGroup>
                      <Chakra.InputLeftAddon
                        border={0}
                        background="purple.500"
                        color="white"
                      >
                        <MdLockOutline />
                      </Chakra.InputLeftAddon>
                      <Field
                        as={Chakra.Input}
                        id="confirmPassword"
                        name="confirmPassword"
                        variant="filled"
                        type="password"
                        focusBorderColor="purple.500"
                        roundedStart={0}
                        onChange={handleChange}
                        validate={(value: string) => {
                          let error

                          if (value.length == 0) {
                            error = 'Confirm your password'
                          } else if (value != values.password) {
                            error = 'Password does not match'
                          }

                          return error
                        }}
                      />
                    </Chakra.InputGroup>
                    <Chakra.FormErrorMessage>
                      {errors.confirmPassword}
                    </Chakra.FormErrorMessage>
                  </Chakra.FormControl>
                  <Chakra.Button
                    colorScheme="purple"
                    type="submit"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Register
                  </Chakra.Button>
                </Chakra.Stack>
              </Form>
            )}
          </Formik>
        )}
      </Chakra.Box>
    </Chakra.Flex>
  )
}

export default RegisterUser
