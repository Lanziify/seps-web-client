import * as yup from 'yup'

export const AssessmentFormSchema = yup.object().shape({
  studentId: yup
    .number()
    .typeError('Invalid ID number. Please enter a valid ID number.')
    .positive('Invalid Student ID')
    .required('Student ID is required'),
  general_appearance: yup
    .number()
    .required('General Appearance is required')
    .min(1, 'Please select one of these options'),
  manner_of_speaking: yup
    .number()
    .required('Manner of Speaking is required')
    .min(1, 'Please select one of these options'),
  physical_condition: yup
    .number()
    .required('Physical Condition is required')
    .min(1, 'Please select one of these options'),
  mental_alertness: yup
    .number()
    .required('Mental Alertness is required')
    .min(1, 'Please select one of these options'),
  self_confidence: yup
    .number()
    .required('Self Confidence is required')
    .min(1, 'Please select one of these options'),
  ability_to_present_ideas: yup
    .number()
    .required('Ability to Present Ideas is required')
    .min(1, 'Please select one of these options'),
  communication_skills: yup
    .number()
    .required('Communication Skills is required')
    .min(1, 'Please select one of these options'),
  performance_rating: yup
    .number()
    .required('Performance Rating is required')
    .min(1, 'Please select one of these options'),
})
