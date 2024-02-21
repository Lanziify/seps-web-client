import * as Chakra from '@chakra-ui/react'
import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { regex } from '../strings/regex'
import { MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import useAxiosInterceptor from '../hooks/useAxiosInterceptor'

interface RegistrationValues {
  email: string
  password: string
}

const LoginUser: React.FC = () => {
  const { user, saveToken, logoutUser } = useAuth()

  const axios = useAxiosInterceptor()

  const [loginError, setLoginError] = React.useState<string | null>(null)

  const handleSubmit = async (values: RegistrationValues) => {
    try {
      const response = await axios.post('/login', {
        ...values,
      })

      saveToken(response.data)
    } catch (error: any) {
      setLoginError(error.message)
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
    <Chakra.Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Chakra.Box bg="white" p={6} rounded="md" margin={8} w={420}>
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
              <Chakra.Stack padding={3} spacing={3}>
                <Chakra.Heading as="h1" size="lg" marginBottom={2} textAlign='center'>
                  Student Employability Prediction System
                </Chakra.Heading>
                <Chakra.Alert status="error" hidden={!loginError} rounded="md">
                  <Chakra.AlertIcon />
                  <Chakra.Box>
                    <Chakra.AlertDescription>
                      {loginError}
                    </Chakra.AlertDescription>
                  </Chakra.Box>
                  <Chakra.CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={onClose}
                  />
                </Chakra.Alert>
                <Chakra.FormControl
                  isInvalid={!!errors.email && !!touched.email}
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
                  <Chakra.FormErrorMessage>
                    {errors.email}
                  </Chakra.FormErrorMessage>
                </Chakra.FormControl>
                <Chakra.FormControl
                  isInvalid={!!errors.password && !!touched.password}
                >
                  <Chakra.FormLabel htmlFor="password">
                    Password
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
                  <Chakra.FormErrorMessage>
                    {errors.password}
                  </Chakra.FormErrorMessage>
                </Chakra.FormControl>
                <Chakra.Text fontSize={14} placeSelf="flex-end">
                  Forgot Password?
                </Chakra.Text>
                <div></div>
                <Chakra.Button
                  colorScheme="purple"
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  Login
                </Chakra.Button>
              </Chakra.Stack>
            </Form>
          )}
        </Formik>
      </Chakra.Box>
    </Chakra.Flex>
  )
}

export default LoginUser
