import User from '#models/user'
import { signInValidator, signUpValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async signIn({ request, response }: HttpContext) {
    const payload = await request.validateUsing(signInValidator)
    const user = await User.verifyCredentials(payload.email, payload.password)
    const token = await User.accessTokens.create(user)
    response.ok({
      data: {
        type: 'barer',
        value: token.value!.release(),
      },
    })
  }

  async SignUp({ request, response }: HttpContext) {
    const payload = await request.validateUsing(signUpValidator)

    const emailExists = await User.query().where('email', payload.email).first()

    if (emailExists) {
      return response.badRequest({
        errors: [
          {
            field: 'email',
            message: 'Email already exists',
          },
        ],
      })
    }
    const user = await User.create(payload)
    const token = await User.accessTokens.create(user)

    response.created({
      data: {
        type: 'bearer',
        value: token.value!.release(),
      },
    })
  }
}
