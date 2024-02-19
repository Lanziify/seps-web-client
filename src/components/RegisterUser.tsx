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
} from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { regex } from '../strings/regex'

interface RegistrationValues {
  username: string
  email: string
  password: string
}

const RegisterUser: React.FC = () => {
  
  const handleSubmit = async (values: RegistrationValues) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/register`,
        {
          ...values,
        }
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
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
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" margin={8} w={420}>
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
              <Stack padding={3} spacing={3}>
                <Heading as="h1" size="2xl">
                  Register
                </Heading>
                <FormControl
                  isInvalid={!!errors.username && !!touched.username}
                  isRequired
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    variant="filled"
                    type="text"
                    focusBorderColor="purple.500"
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.email && !!touched.email}
                  isRequired
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    variant="filled"
                    type="email"
                    focusBorderColor="purple.500"
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.password && !!touched.password}
                  isRequired
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    variant="filled"
                    type="password"
                    focusBorderColor="purple.500"
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    !!errors.confirmPassword && !!touched.confirmPassword
                  }
                  isRequired
                >
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    variant="filled"
                    type="password"
                    focusBorderColor="purple.500"
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
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>

                <Button colorScheme="purple" type="submit" isDisabled={isSubmitting}>
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default RegisterUser
