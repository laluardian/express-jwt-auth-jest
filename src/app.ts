import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { ExpressError } from './utils/express-error'
import {
  signUpRouter,
  signInRouter,
  signOutRouter,
  currentUserRouter
} from './routes'

export const app = express()
app.use(json())
app.use(
  cookieSession({
    signed: false,
    // whenever jest runs our test, it's gonna sets the NODE_ENV === 'test'
    // which then gives us false, otherwise gives us true (in dev/prod env)
    secure: process.env.NODE_ENV !== 'test'
  })
)

app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(currentUserRouter)

app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err
    res.status(statusCode).send({
      error: {
        message,
        statusCode
      }
    })
  }
)
