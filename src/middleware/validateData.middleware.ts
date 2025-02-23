import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'
import { formatValidationError } from 'utils'

export const validateDataMiddleware = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error)
        const errorMessage = formatValidationError(error)
        res.status(400).json({
          success: false,
          message: errorMessage,
        })
        return
      }
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      })
    }
  }
}
