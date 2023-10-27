import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export interface IUser {
  email: string
  id: number
}


export const getUserOrNull = async (email: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return (user == null)
    ? null
    : {
        email: user.email,
        id: user.id
      }
}

export const getUserByIdOrNull = async (userId: number): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return user == null
    ? null
    : {
        email: user.email,
        id: user.id
      }
}

export const registerUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      encryptedPassword: hashPassword(password)
    }
  })
  return {
    id: user.id,
    email: user.email
  }
}

export const authenticate = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (existingUser != null && validatePassword(password, existingUser.encryptedPassword)) {
    return {
      userId: existingUser.id,
      message: null
    }
  } else {
    return {
      userId: null,
      message: 'Invalid email or password'
    }
  }
}
const hashPassword = (plainText: string): string => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(plainText, salt)
}
const validatePassword = (givenPassword: string, encryptedPassword: string): boolean => {
  return bcrypt.compareSync(givenPassword, encryptedPassword)
}
