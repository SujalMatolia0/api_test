import Folder from '#models/folder'
import { folderListValidator, folderValidator } from '#validators/folder'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'

export default class FoldersController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const payload = await request.validateUsing(folderListValidator)

    const Folders = await Folder.query().paginate(payload.params.page, payload.params.perPage)

    return response.ok({ Folders })
  }

  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(folderValidator)
    const folderSlug = stringHelpers.slug(payload.name)

    const existingFolder = await Folder.query().where('slug', folderSlug).select('id').first()

    if (existingFolder) {
      return response.conflict({
        errors: [
          {
            message: 'Folder with the same name already exists',
            field: 'name',
          },
        ],
      })
    }

    const folder = await Folder.create(payload)

    return response.created({ data: { folder } })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const folder = await Folder.query().where('id', params.id).first()
    if (!folder) {
      return response.notFound({ message: 'Folder not found' })
    }
    return response.ok({ data: { folder } })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(folderValidator)

    const folder = await Folder.query().where('id', params.id).select('id').first()

    if (!folder) {
      return response.badRequest({
        errors: [
          {
            messages: 'folder not found',
          },
        ],
      })
    }

    folder.merge(payload)

    await folder.save()

    return response.ok({ data: { folder } })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const folder = await Folder.query().where('id', params.id).first()

    if (!folder) {
      return response.notFound({ message: 'Folder not found' })
    }
    await folder.delete()

    return response.ok({ message: 'Folder deleted' })
  }
}
