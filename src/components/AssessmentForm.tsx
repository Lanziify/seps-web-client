import * as React from "react";
import * as Chakra from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { AssessmentFormSchema } from "../utils/validation";
import { InitialFeatureValues } from "../data/InitialFeatureValues";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { useAuth } from "../context/AuthContext";
import { likertScale } from "../data/likertScale";
import LottieLoading from "./LottieLoading";
import { useModal } from "../context/ModalContext";

interface Features {
  [key: string]: string | number;
}

const AssessmentForm = () => {
  const { token } = useAuth();
  const {
    onOpen,
    onClose,
    mountModalHeader,
    mountModalContent,
    mountModalFooter,
    onModalLoading,
  } = useModal();
  const cancelRef = React.useRef(null);
  const customAxios = useAxiosInterceptor();

  const handleSubmitForm = async (
    event: React.MouseEvent<Element>,
    values: Features,
    props: FormikProps<Features>
  ) => {
    try {
      const features = [];

      features.push(values.general_appearance);
      features.push(values.manner_of_speaking);
      features.push(values.physical_condition);
      features.push(values.mental_alertness);
      features.push(values.self_confidence);
      features.push(values.ability_to_present_ideas);
      features.push(values.communication_skills);
      features.push(values.performance_rating);

      props.setSubmitting(true);
      onOpen();

      if (features.includes(0) || Object.keys(props.errors).length > 0) {
        mountModalHeader(<Chakra.Text>Form Error</Chakra.Text>);
        mountModalContent(
          <Chakra.Stack marginX={4}>
            <Chakra.Text>
              It seeems like you are trying to submit a form with invalid or
              empty fields. Please try again.
            </Chakra.Text>
          </Chakra.Stack>
        );
        mountModalFooter(
          <Chakra.Button
            ref={cancelRef}
            onClick={() => onClose()}
            colorScheme="purple"
          >
            Okay
          </Chakra.Button>
        );
        props.setSubmitting(false);
        return;
      }

      onModalLoading(true);
      mountModalContent(
        <Chakra.Stack padding={12}>
          <LottieLoading />
        </Chakra.Stack>
      );

      const response = await customAxios.post(
        (event.target as HTMLElement).id === "upload"
          ? "/upload"
          : "/upload_predict",
        {
          studentId: values.studentId,
          features: features,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      mountModalHeader(<Chakra.Text>{response.data.title}</Chakra.Text>);
      mountModalContent(
        <Chakra.Stack marginX={4}>
          <div dangerouslySetInnerHTML={{ __html: response.data.message }} />
        </Chakra.Stack>
      );
      mountModalFooter(
        <Chakra.Button
          ref={cancelRef}
          onClick={() => onClose()}
          colorScheme="purple"
        >
          Okay
        </Chakra.Button>
      );
      onModalLoading(false);
      props.resetForm();
      props.setSubmitting(false);
    } catch (error: any) {
      mountModalHeader(<Chakra.Text>{error.title}</Chakra.Text>);
      mountModalContent(
        <Chakra.Stack marginX={4}>
          <div dangerouslySetInnerHTML={{ __html: error.message }} />
        </Chakra.Stack>
      );
      mountModalFooter(
        <Chakra.Button
          ref={cancelRef}
          onClick={() => onClose()}
          colorScheme="purple"
        >
          Okay
        </Chakra.Button>
      );
      props.setSubmitting(false);
    }
  };

  const handleOptionButtonClick = (formikProps: FormikProps<Features>) => {
    onOpen();
    mountModalHeader(<Chakra.Text>Select options</Chakra.Text>);
    mountModalContent(
      <Chakra.Stack marginX={4}>
        <Chakra.Text>Please select an option</Chakra.Text>
      </Chakra.Stack>
    );
    mountModalFooter(
      <Chakra.Stack flexGrow={1}>
        <Chakra.Button
          id="upload"
          variant="solid"
          type="submit"
          onClick={(event: React.MouseEvent<Element>) => {
            onClose();
            handleSubmitForm(event, formikProps.values, formikProps);
          }}
        >
          Upload
        </Chakra.Button>
        <Chakra.Button
          id="upload_predict"
          variant="solid"
          colorScheme="purple"
          onClick={(event: React.MouseEvent<Element>) => {
            onClose();
            handleSubmitForm(event, formikProps.values, formikProps);
          }}
        >
          Upload and Predict
        </Chakra.Button>
      </Chakra.Stack>
    );
  };

  const handlePreSubmit = (formikProps: FormikProps<Features>) => {
    Object.keys(InitialFeatureValues).forEach(async (key) => {
      await formikProps.setFieldTouched(key, true).then((errors) => {
        if (typeof errors === "object" && Object.keys(errors).length === 0) {
          handleOptionButtonClick(formikProps);
        }
      });
    });
  };

  const handleMouseEvents = (event: React.MouseEvent, isVisible: boolean) => {
    const card = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - card.left;
    const mouseY = event.clientY - card.top;

    const childElement = event.currentTarget.children[3] as HTMLElement;

    childElement.style.transition =
      "width 0.4s, height 0.4s, opacity 0.4s, visibility 0.4s";

    if (!childElement.style.width || !childElement.style.height) {
      childElement.style.width = "0px";
      childElement.style.height = "0px";
      childElement.style.transition =
        "width 0.4s, height 0.4s, opacity 0.4s, visibility 0.4s";
    }

    childElement.style.visibility = isVisible ? "visible" : "hidden";
    childElement.style.opacity = isVisible ? "1" : "0";
    childElement.style.width = isVisible
      ? `${event.currentTarget.scrollWidth * 2.5}px`
      : "0px";
    childElement.style.height = isVisible
      ? `${event.currentTarget.scrollWidth * 2.5}px`
      : "0px";
    childElement.style.top = mouseY + "px";
    childElement.style.left = mouseX + "px";
  };

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
                  as="h2"
                  fontSize={"3xl"}
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
                    <Chakra.Heading as="h2" size="lg" mb={4}>
                      {feature.label}
                    </Chakra.Heading>
                    <Chakra.Text marginBottom={2} fontSize="sm">
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
                              if (formikProps.isSubmitting) return;
                              formikProps.setFieldValue(feature.name, j + 1);
                            }}
                            transition="all 0.3s"
                            _hover={{
                              color: "white",
                            }}
                            style={{
                              backgroundColor:
                                formikProps.values[feature.name] === j + 1
                                  ? "#9F7AEA"
                                  : "",
                              color:
                                formikProps.values[feature.name] === j + 1
                                  ? "white"
                                  : "",
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
                            shadow="none"
                            borderWidth={1}
                            borderColor="gray.200"
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
                  <Chakra.FormErrorMessage marginBottom={8}>
                    {formikProps.errors[feature.name]}
                  </Chakra.FormErrorMessage>
                </Chakra.FormControl>
              ))}
              <Chakra.Button
                colorScheme="purple"
                isDisabled={formikProps.isSubmitting}
                isLoading={formikProps.isSubmitting}
                onClick={() => handlePreSubmit(formikProps)}
              >
                Submit
              </Chakra.Button>
            </Chakra.Stack>
          </Form>
        )}
      </Formik>
    </Chakra.Box>
  );
};

export default AssessmentForm;
