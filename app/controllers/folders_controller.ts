import Folder from '#models/folder'
import { folderListValidator, folderValidator } from '#validators/folder'
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
  async create({request, response}: HttpContext) {
    const payload = await request.validateUsing(folderValidator)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
