import { Router } from 'express'
import requireLogin from '@/middleware/require-login'
import * as dotenv from 'dotenv'
import { registerNewUser, loginUser, validateJwtToken } from '@/handlers/auth'
dotenv.config()

const router = Router()

router.post('/auth/register', registerNewUser)
router.post('/auth/login', loginUser)
router.get('/auth/verify', requireLogin, validateJwtToken)

export default router
