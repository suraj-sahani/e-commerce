import { ZodError } from 'zod'

export const formatValidationError = (error: ZodError) => {
  const fieldName =
    error.issues[0].path[0].toString().charAt(0).toUpperCase() +
    error.issues[0].path[0].toString().slice(1).toLowerCase()
  return `${fieldName}: ${error.issues[0].message}`
}
