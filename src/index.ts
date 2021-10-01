if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import { app } from './app'
import mongoose from 'mongoose'

const main = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  if (!process.env.PORT) {
    throw new Error('PORT must be defined')
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to database')
  } catch (err) {
    console.log(err)
  }

  app.listen(process.env.PORT, () => {
    console.log('Listening on port %s', process.env.PORT)
  })
}

main()
