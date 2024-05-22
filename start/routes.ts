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
                router.post('', '#controllers/folders_controller.create')

                router.get('/:id', '#controllers/folders_controller.show')
                router.put('/:id', '#controllers/folders_controller.update')

                router.delete('/:id', '#controllers/folders_controller.delete')

                router
                  .group(() => {
                    router.get('', '#controllers/files_controller.index')
                    router.post('', '#controllers/files_controller.create')

                    router.get('/:id', '#controllers/files_controller.show')
                    router.put('/:id', '#controllers/files_controller.update')

                    router.delete('/:id', '#controllers/files_controller.destroy')
                  })
                  .prefix('file')
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
