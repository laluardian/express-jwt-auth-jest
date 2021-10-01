import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { ExpressError } from '../utils/express-error'

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  // https://stackoverflow.com/questions/58848625
  const extractedErrors: string[] = []
  errors.array().map(err => extractedErrors.push(err.msg))

  if (!errors.isEmpty()) {
    throw new ExpressError(400, extractedErrors[0])
  }

  next()
}
