import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const createMovie = async (
  { movieName, rating, cast, genre, releaseDate, createdById }: { movieName: string, rating: number, cast: string[], genre: string, releaseDate: Date, createdById: number }) => {
  const movie = await prisma.movie.create({
    data: {
      name: movieName,
      rating,
      cast,
      genre,
      releaseDate,
      createdById
    }
  })

  return {
    movieId: movie.id
  }
}

export const getMoviesForUser = async (createdById: number) => {
  const movies = await prisma.movie.findMany({
    where: {
      createdById
    }
  })
  return movies
}
