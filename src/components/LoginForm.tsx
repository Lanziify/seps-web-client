import * as Chakra from '@chakra-ui/react'
import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { regex } from '../strings/regex'
import { MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'

type LoginValues = {
  email: string
  password: string
}

type LoginProps = {
  href?: string
  onLinkClick?: () => void
}

const LoginForm: React.FC<LoginProps> = (props: LoginProps) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [loginError, setLoginError] = React.useState(null)
  const { loginUser } = useAuth()

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

  const handleSubmit = async (values: LoginValues) => {
    try {
      await loginUser(values)
    } catch (error: any) {
      setLoginError(error.message)
    }
  }

  const handleCloseError = () => {
    setLoginError(null)
  }

  return (
    <Chakra.Box p={6}>
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
              <Chakra.Heading
                as="h1"
                size="2xl"
                fontWeight={700}
                marginBottom={2}
              >
                Login
              </Chakra.Heading>
              <Chakra.Alert status="error" hidden={!loginError} rounded="md">
                <Chakra.AlertIcon />
                <Chakra.Box width="inherit">
                  <Chakra.AlertDescription>
                    {loginError}
                  </Chakra.AlertDescription>
                </Chakra.Box>
                <Chakra.CloseButton
                  alignSelf="flex-start"
                  position="relative"
                  right={-1}
                  top={-1}
                  onClick={handleCloseError}
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
                <Chakra.Link color="purple.500" href={props.href} onClick={props.onLinkClick}>Create account</Chakra.Link>
              </Chakra.Text>
            </Chakra.Stack>
          </Form>
        )}
      </Formik>
    </Chakra.Box>
  )
}

export default LoginForm
