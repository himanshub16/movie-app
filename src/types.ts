import type Express from 'express'
import { type Send, type Query } from 'express-serve-static-core'

export interface IAuthVerifyReq {
  email: string
  jwtToken: string
};

export interface IAuthVerifyRes {
  result: boolean
};

export interface IRegisterRequest {
  email: string
  password: string
}

export interface IRegisterResponse {
  error?: string
}

export interface ILoginRequest extends IRegisterRequest {}

export interface ILoginResponse {
  jwtToken?: string
  error?: string
}

export interface IJwtPayload {
  email: string
  userId: number
}

export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U
  query: T
}

export interface AuthorizedRequest<T> extends Express.Request {
  userId?: number
  body: T
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T
}

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>
}
