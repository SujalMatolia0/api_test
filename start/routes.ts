/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

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
      })
      .prefix('v1')
  })
  .prefix('api')
