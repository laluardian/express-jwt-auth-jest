import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { validateRequest } from '../middlewares/validate-request'
import { catchAsync } from '../utils/catch-async'
import { ExpressError } from '../utils/express-error'
import { Password } from '../libs/password'

const router = express.Router()

router.post(
  '/api/signin',
  [
    body('email').isEmail().withMessage('Email must be correct'),
    body('password').trim().notEmpty().withMessage('Password cannot empty')
  ],
  validateRequest,
  catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new ExpressError(400, 'Invalid credentials')
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    )
    if (!passwordMatch) {
      throw new ExpressError(400, 'Invalid credentials')
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    )

    req.session = {
      jwt: userJwt
    }

    res.status(200).send(existingUser)
  })
)

export { router as signInRouter }
