import requireLogin from '@/middleware/require-login'
import { Router } from 'express'
import { addMovie, getMovies } from '@/handlers/movie'

const router = Router()
router.use(requireLogin)

router.post('/movies', addMovie)
router.get('/movies', getMovies)

export default router
