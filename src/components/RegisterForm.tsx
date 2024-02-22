import * as Chakra from '@chakra-ui/react'
import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { regex } from '../strings/regex'
import {
  MdLockOutline,
  MdOutlineAlternateEmail,
  MdPersonOutline,
} from 'react-icons/md'
import { NavLink } from 'react-router-dom'

type PropTypes = {
  onSubmit: any
  registrationError: any
  onCloseError: any
  toLoginLink: string
}

const RegisterForm: React.FC<PropTypes> = (props: PropTypes) => {
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
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={registrationValidationSchema}
          enableReinitialize={true}
          onSubmit={props.onSubmit}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <Chakra.Stack padding={3} spacing={3}>
                <Chakra.Heading as="h1" size="xl">
                  Register
                </Chakra.Heading>
                <Chakra.Alert
                  status="error"
                  hidden={!props.registrationError}
                  rounded="md"
                >
                  <Chakra.AlertIcon />
                  <Chakra.Box width="inherit">
                    <Chakra.AlertDescription>
                      {props.registrationError}
                    </Chakra.AlertDescription>
                  </Chakra.Box>
                  <Chakra.CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={props.onCloseError}
                  />
                </Chakra.Alert>
                <Chakra.FormControl
                  isInvalid={!!errors.username && !!touched.username}
                >
                  <Chakra.FormLabel htmlFor="username">
                    Username
                  </Chakra.FormLabel>
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
                  <Chakra.FormErrorMessage>
                    {errors.username}
                  </Chakra.FormErrorMessage>
                </Chakra.FormControl>

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

                <Chakra.FormControl
                  isInvalid={
                    !!errors.confirmPassword && !!touched.confirmPassword
                  }
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
                <div></div>
                <Chakra.Button
                  colorScheme="purple"
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  Register
                </Chakra.Button>
                <Chakra.Text fontSize={14} marginTop={4} placeSelf="center">
                  Already have an account?{' '}
                  <NavLink
                    to={props.toLoginLink}
                    className="text-purple-400 font-semibold"
                  >
                    Login
                  </NavLink>
                </Chakra.Text>
              </Chakra.Stack>
            </Form>
          )}
        </Formik>
      </Chakra.Box>
    </Chakra.Flex>
  )
}

export default RegisterForm
