import { fileValidator } from '#validators/folder'
import type { HttpContext } from '@adonisjs/core/http'
import File from '#models/file'

export default class FilesController {
  /**
   * Display a list of resource
   */
  async index({ params, request, response }: HttpContext) {
    const { folderId } = params
    
    response.ok({
      data: {
        files: files.name,
      },
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    const files = await request.validateUsing(fileValidator)

    const nameExists = await File.query().where('name', files.name)

    if (nameExists) {
      return response.badRequest({
        error: [{ fields: 'name', message: 'Name already exists' }],
      })
    }

    const file = await File.create(files)

    response.created({
      data: {
        type: 'bearer',
        message: file.name + 'created',
      },
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const file = await File.query().where('id', params.id).firstOrFail()
    return response.json(file)
  }

  /**
   * Edit individual record
   */
  async edit({ params, request, response }: HttpContext) {
    const file = await File.query().where('id', params.id).firstOrFail()
    const newFile = await request.validateUsing(fileValidator)
    file.name = newFile.name
    file.data = newFile.data
    file.size = newFile.size
    await file.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const file = await File.findOrFail(params.id)
    await file.delete()
  }
}
