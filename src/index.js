import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
// import routes from './route'

dotenv.config()

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)

const db = mongoose.connection

db.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err)
})

db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Database connection established')
})

const app = express()

//  Log request to console
app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// enable cors
app.use(cors())

// import routes into application
// app.use(routes)

const router = express.Router()

router.get('/', (req, res) => {
  res.end('Hello from the server')
})

app.use(router)

const port = parseInt(process.env.PORT, 10) || 8080
app.set('port', port)

// eslint-disable-next-line no-console
app.listen(port, () => console.log('Server is running on port ', port))

export default app
