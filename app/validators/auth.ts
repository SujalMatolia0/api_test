import vine from '@vinejs/vine'
import { userEmailSchema, userFullNameSchema, userPasswordSchema } from './index.js'

export const signInValidator = vine.compile(
  vine.object({
    email: userEmailSchema,
    password: userPasswordSchema,
  })
)

export const signUpValidator = vine.compile(
  vine.object({
    email: userEmailSchema,
    password: userPasswordSchema,
    fullName: userFullNameSchema,
  })
)
