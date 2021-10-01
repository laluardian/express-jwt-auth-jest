import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/api/signout', (req: Request, res: Response) => {
  req.session = null
  res.send({})
})

export { router as signOutRouter }
