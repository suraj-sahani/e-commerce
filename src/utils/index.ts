import { ValidationError } from 'utils/types'

export const formatValidationError = (error: ValidationError) => {
  const fieldName =
    error.issues[0].path[0].charAt(0).toUpperCase() +
    error.issues[0].path[0].slice(1)
  return `${fieldName}: ${error.issues[0].message}`
}
