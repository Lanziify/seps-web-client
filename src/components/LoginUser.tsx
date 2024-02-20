import {
  Stack,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  Flex,
  Heading,
  InputGroup,
  InputLeftAddon,
  Alert,
  AlertDescription,
  CloseButton,
  AlertIcon,
} from '@chakra-ui/react'
import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { regex } from '../strings/regex'
import { MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import axios, { AxiosError } from 'axios'

interface RegistrationValues {
  email: string
  password: string
}

interface ErrorResponse {
  error: string
}

const LoginUser: React.FC = () => {
  const { loginUser } = useAuth()
  const [loginError, setLoginError] = React.useState<string | null>(null)

  const handleSubmit = async (values: RegistrationValues) => {
    try {
      await loginUser(values)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>
        if (axiosError.response?.data) {
          setLoginError(axiosError.response.data.error)
        }
      }
    }
  }

  const onClose = () => {
    setLoginError(null)
  }

  const registrationValidationSchema = yup.object().shape({
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
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" margin={8} w={420}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={registrationValidationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <Stack padding={3} spacing={3}>
                <Heading as="h1" size="2xl" marginBottom={2}>
                  Login
                </Heading>
                <Alert status="error" hidden={!loginError} rounded="md">
                  <AlertIcon />
                  <Box>
                    <AlertDescription>{loginError}</AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={onClose}
                  />
                </Alert>
                <FormControl
                  isInvalid={!!errors.email && !!touched.email}
                  isRequired
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      border={0}
                      background="purple.500"
                      color="white"
                    >
                      <MdOutlineAlternateEmail />
                    </InputLeftAddon>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      variant="filled"
                      type="email"
                      focusBorderColor="purple.500"
                      roundedStart={0}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.password && !!touched.password}
                  isRequired
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      border={0}
                      background="purple.500"
                      color="white"
                    >
                      <MdLockOutline />
                    </InputLeftAddon>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      variant="filled"
                      type="password"
                      focusBorderColor="purple.500"
                      roundedStart={0}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  colorScheme="purple"
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default LoginUser
