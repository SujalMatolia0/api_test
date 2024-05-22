/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router
          .group(() => {
            router.post('signIn', '#controllers/auth_controller.signIn')
            router.post('signUp', '#controllers/auth_controller.SignUp')
          })
          .prefix('auth')
        router
          .group(() => {
            router
              .group(() => {
                router.get('', '#controllers/folders_controller.index')
              })
              .prefix('folder')
          })
          .prefix('app')
          .use(
            middleware.auth({
              guards: ['api'],
            })
          )
      })
      .prefix('v1')
  })
  .prefix('api')
