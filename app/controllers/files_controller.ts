import {
  fileDeleteValidator,
  fileListValidator,
  fileShowValidator,
  fileValidator,
} from '#validators/folder'
import type { HttpContext } from '@adonisjs/core/http'
import File from '#models/file'

export default class FilesController {
  /**
   * Display a list of resource
   */
  async index({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(fileListValidator)

    const files = await File.query()
      .where('folder_id', params.id)
      .paginate(payload.params.page, payload.params.perPage)

    return response.ok({ files })
  }

  /**
   * Display form to create a new record
   */
  async create({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(fileValidator)

    const existingFile = await File.query().where('name', payload.name).select('id').first()

    if (existingFile) {
      return response.conflict({
        errors: [
          {
            message: 'File with the same name already exists',
            field: 'name',
          },
        ],
      })
    }

    const file = await File.create({ folderId: params.id, name: payload.name, data: payload.data })

    return response.created({ data: { file } })
  }

  /**
   * Show individual record
   */
  async show({ request, response }: HttpContext) {
    const payload = await request.validateUsing(fileShowValidator)

    const file = await File.query().where('name', payload.name && 'folderId', payload.folderId)

    if (!file) {
      return response.badRequest({
        errors: [
          {
            message: 'File not found',
            field: 'name',
          },
        ],
      })
    }

    return response.ok({ file })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(fileValidator)

    const file = await File.query()
      .where('id', params.id && 'folderId', payload.folderId)
      .first()

    if (!file) {
      return response.badRequest({
        errors: [
          {
            messages: 'folder not found',
          },
        ],
      })
    }

    file.merge({
      name: payload.name,
      data: payload.data,
    })

    await file.save()

    return response.ok({ data: { file } })
  }

  /**
   * Delete record
   */
  async destroy({ request, response }: HttpContext) {
    const payload = await request.validateUsing(fileDeleteValidator)

    const file = await File.query()
      .where('name', payload.name && 'folderId', payload.folderId)
      .first()

    if (!file) {
      return response.notFound({ message: 'file not found' })
    }
    await file.delete()

    return response.ok({ message: 'file deleted' })
  }
}
