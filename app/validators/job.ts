import vine from '@vinejs/vine'
import {
  jobsNameSchema,
  jobsScheduleSchema,
  jobsStatusSchema,
  jobsUrlSchema,
  pageSchema,
  perPageSchema,
} from './index.js'

export const jobsListValidator = vine.compile(
  vine.object({
    params: vine.object({
      page: pageSchema,
      perPage: perPageSchema,
    }),
  })
)

export const jobsHistoryValidator = vine.compile(
  vine.object({
    params: vine.object({
      page: pageSchema,
      perPage: perPageSchema,
    }),
  })
)

export const jobsCreateValidator = vine.compile(
  vine.object({
    name: jobsNameSchema,
    schedule: jobsScheduleSchema,
    url: jobsUrlSchema,
  })
)

export const jobsUpdateValidator = vine.compile(
  vine.object({
    name: jobsNameSchema,
    schedule: jobsScheduleSchema,
    url: jobsUrlSchema,
    status: jobsStatusSchema,
  })
)

export const jobsShowValidator = vine.compile(
  vine.object({
    name: jobsNameSchema,
  })
)
