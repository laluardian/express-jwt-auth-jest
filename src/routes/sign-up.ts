import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { validateRequest } from '../middlewares/validate-request'
import { catchAsync } from '../utils/catch-async'
import { ExpressError } from '../utils/express-error'

const router = express.Router()

router.post(
  '/api/signup',
  [
    body('email').isEmail().withMessage('Email must be correct'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 character')
  ],
  validateRequest,
  catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new ExpressError(400, 'Email already in use')
    }

    const user = User.build({ email, password })
    await user.save()

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    )

    req.session = {
      jwt: userJwt
    }

    res.status(201).send(user)
  })
)

export { router as signUpRouter }
