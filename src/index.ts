import express from 'express'
import bodyParser from 'body-parser'
import rootRouter from './routes/index'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT ?? 8080

app.use(rootRouter)

app.listen(port, () => `Express server started on port ${port}`)
