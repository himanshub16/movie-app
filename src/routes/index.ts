import { Router } from 'express'
import healthRouter from './health'
import authRouter from './auth'
import movieRouter from './movie'
import path from 'path'

const rootRouter = Router()

rootRouter.use(healthRouter)

// single-page app
rootRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/index.html'))
})

rootRouter.use(authRouter)
rootRouter.use(movieRouter)

export default rootRouter
