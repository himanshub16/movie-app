import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Everything is fine!'
  })
})

export default router
