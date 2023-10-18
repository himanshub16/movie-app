import { Router } from 'express'
import healthRouter from './health'
import authRouter from './auth'
import path from 'path'

const rootRouter = Router()

rootRouter.use(healthRouter)

// single-page app
rootRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/index.html'))
})

rootRouter.use(authRouter)

export default rootRouter
