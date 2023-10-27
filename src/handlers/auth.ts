import jwt from 'jsonwebtoken'
import { registerUser, authenticate } from '@/models/user'
import { type TypedRequestBody, type IRegisterRequest, type TypedResponse, type IRegisterResponse, type ILoginRequest, type ILoginResponse, type AuthorizedRequest, type IAuthVerifyReq, type IAuthVerifyRes, type IJwtPayload } from '@/types'

export const registerNewUser = (req: TypedRequestBody<IRegisterRequest>, res: TypedResponse<IRegisterResponse>) => {
  registerUser(req.body.email, req.body.password)
    .then(user => {
      res.json({})
    })
    .catch((err) => {
      console.error(err)
      if (err.code === 'P2002') {
        res.status(400).json({
          error: 'Email already in use'
        })
      } else {
        res.status(500).json({
          error: 'Internal server error'
        })
      }
    })
}

export const loginUser = (req: TypedRequestBody<ILoginRequest>, res: TypedResponse<ILoginResponse>) => {
  authenticate(req.body.email, req.body.password)
    .then(r => {
      if (r.userId != null) {
        res.json({
          jwtToken: generateJwtToken(({ userId: r.userId, email: req.body.email }))
        })
      } else {
        res.status(400).json({
          error: r.message
        })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: 'Internal server error'
      })
    })
}
export const validateJwtToken = (req: AuthorizedRequest<IAuthVerifyReq>, res: TypedResponse<IAuthVerifyRes>) => {
  res.json({
    result: true
  })
}

export function generateJwtToken (payload: IJwtPayload): string | undefined {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string)
}
