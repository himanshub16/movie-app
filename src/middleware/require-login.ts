import { type RequestHandler } from 'express'
import { getUserByIdOrNull } from '@/models/user'
import { type AuthorizedRequest, type IJwtPayload } from '@/types'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const requireLogin: RequestHandler = (req: AuthorizedRequest<any>, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader === undefined) {
    res.status(401).json({
      message: 'You are not authorized for this request'
    })
    return
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!(authHeader.startsWith('Bearer '))) {
    res.status(401).json({
      message: 'You are not authorized for this request'
    })
  }

  const extractedToken = getJwtToken(authHeader)
  const result = verifyJwtToken(extractedToken)
  if (result.valid && result.payload !== null) {
    getUserByIdOrNull(result.payload.userId)
      .then(user => {
        if (user !== null) {
          req.userId = user.id
          next()
        } else {
          res.status(401).json({ message: 'Unauthorized' })
        }
      }).catch(ex => {
        console.error(ex)
        res.status(500).json({ message: 'Internal error' })
      })
  } else {
    res.status(401).json({ message: 'Unauthorized ' })
  }
}

const verifyJwtToken = (jwtToken: string) => {
  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY as string) as IJwtPayload

    return {
      valid: true,
      payload
    }
  } catch (err) {
    return {
      valid: false,
      payload: null
    }
  }
}

const getJwtToken = (headerValue: string): string => {
  return headerValue.split(' ')[1]
}

export default requireLogin
