import Job from '#models/job'
import {
  jobsCreateValidator,
  jobsListValidator,
  jobsShowValidator,
  jobsUpdateValidator,
} from '#validators/job'
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'

export default class JobsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const payload = await request.validateUsing(jobsListValidator)

    const jobs = await Job.query().paginate(payload.params.page, payload.params.perPage)

    return response.ok({ jobs })
  }

  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(jobsCreateValidator)

    const existingJob = await Job.query().where('name', payload.name).select('id').first()

    if (existingJob) {
      return response.conflict({
        errors: [
          {
            message: 'Job with the same name already exists',
            field: 'name',
          },
        ],
      })
    }

    const job = await Job.create(payload)

    emitter.emit('job:created', job)

    return response.created({ data: { job } })
  }

  /**
   * Show individual record
   */
  async show({ request, response }: HttpContext) {
    const payload = await request.validateUsing(jobsShowValidator)

    const job = await Job.query().where('name', payload.name).first()

    return response.ok({ job })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(jobsUpdateValidator)

    const job = await Job.query().where('id', params.id).select('id').first()
    if (!job) {
      return response.badRequest({
        error: [{ message: 'Job not found' }],
      })
    }

    await job.save()

    return response.ok({ data: { job } })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const job = await Job.query().where('id', params.id).first()

    if (!job) {
      return response.notFound({ message: 'Folder not found' })
    }
    await job.delete()

    return response.ok({ message: 'Folder deleted' })
  }
}
