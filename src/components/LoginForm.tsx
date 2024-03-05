import * as Chakra from '@chakra-ui/react'
import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { regex } from '../strings/regex'
import { MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { IoEye, IoEyeOff } from 'react-icons/io5'

type PropTypes = {
  onSubmit: any
  loginError: any
  onCloseError: any
  toRegistrationLink: string
}

const LoginForm: React.FC<PropTypes> = (props: PropTypes) => {
  const [showPassword, setShowPassword] = React.useState(false)
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
    <Chakra.Box bg="white" p={6} rounded="2xl" margin={8} w={420} shadow="xl">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={registrationValidationSchema}
        enableReinitialize={true}
        onSubmit={props.onSubmit}
      >
        {({ errors, touched, handleChange, isSubmitting }) => (
          <Form>
            <Chakra.Stack padding={3} spacing={3}>
              <Chakra.Heading
                as="h1"
                size="lg"
                marginBottom={2}
                textAlign="center"
              >
                Student Employability Prediction System
              </Chakra.Heading>
              <Chakra.Alert
                status="error"
                hidden={!props.loginError}
                rounded="md"
              >
                <Chakra.AlertIcon />
                <Chakra.Box width="inherit">
                  <Chakra.AlertDescription>
                    {props.loginError}
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
              <Chakra.FormControl isInvalid={!!errors.email && !!touched.email}>
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
                    type={showPassword ? 'text' : 'password'}
                    focusBorderColor="purple.500"
                    roundedStart={0}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    paddingRight={10}
                  />
                  <Chakra.InputRightElement>
                    <Chakra.IconButton
                      aria-label="Show Password"
                      size="sm"
                      background="transparent"
                      onClick={() => {
                        setShowPassword(!showPassword)
                      }}
                      icon={
                        showPassword ? (
                          <IoEyeOff size={18} className="text-gray-400" />
                        ) : (
                          <IoEye size={18} className="text-gray-400" />
                        )
                      }
                      isDisabled={isSubmitting}
                    />
                  </Chakra.InputRightElement>
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
              <Chakra.Text fontSize={14} marginTop={4} placeSelf="center">
                Don't have an account yet?{' '}
                <NavLink
                  to={props.toRegistrationLink}
                  className="text-purple-400 font-semibold"
                >
                  Create account
                </NavLink>
              </Chakra.Text>
            </Chakra.Stack>
          </Form>
        )}
      </Formik>
    </Chakra.Box>
  )
}

export default LoginForm
