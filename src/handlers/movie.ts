import { createMovie, getMoviesForUser } from '@/models/movie'
import { type AuthorizedRequest, type IAddMovieRequest, type IAddMovieResponse, type TypedResponse, type IErrorResponse, type IMovieListResponse } from '@/types'
import moment from 'moment'

export const addMovie = (req: AuthorizedRequest<IAddMovieRequest>, res: TypedResponse<IAddMovieResponse | IErrorResponse>) => {
  const body = req.body

  const releaseDate = moment(body.releaseDate).toDate()
  console.log(body)

  createMovie({
    movieName: body.movieName,
    rating: body.rating,
    cast: body.cast,
    genre: body.genre,
    releaseDate,
    createdById: req.userId as number
  })
    .then(({ movieId }: { movieId: number }) => {
      res.json({
        movieId
      })
    })
    .catch(e => {
      console.error(e)
      res.status(500).json({
        error: 'some error occured'
      })
    })
}

export const getMovies = (req: AuthorizedRequest<null>, res: TypedResponse<IMovieListResponse | IErrorResponse>) => {
  const userId = req.userId as number
  getMoviesForUser(userId)
    .then(movies => {
      res.json({
        movies: movies.map(m => ({
          name: m.name,
          rating: m.rating,
          cast: m.cast,
          genre: m.genre,
          releaseDate: moment(m.releaseDate).format('D MMM, YYYY')
        }))
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({
        error: 'Error while fetching movies'
      })
    })
}
