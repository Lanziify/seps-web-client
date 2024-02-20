import * as yup from 'yup';

export const AssessmentFormSchema = yup.object().shape({
  studentId: yup.number().required('Student ID is required'),
  generalSpeaking: yup.number().required('General Speaking is required').min(1, 'Please select one of these options'),
  mannerOfSpeaking: yup.number().required('Manner of Speaking is required').min(1, 'Please select one of these options'),
  physicalCondition: yup.number().required('Physical Condition is required').min(1, 'Please select one of these options'),
  mentalAlertness: yup.number().required('Mental Alertness is required').min(1, 'Please select one of these options'),
  selfConfidence: yup.number().required('Self Confidence is required').min(1, 'Please select one of these options'),
  abilityToPresentIdeas: yup.number().required('Ability to Present Ideas is required').min(1, 'Please select one of these options'),
  communicationSkills: yup.number().required('Communication Skills is required').min(1, 'Please select one of these options'),
  performanceRating: yup.number().required('Performance Rating is required').min(1, 'Please select one of these options'),
});
