import vine from '@vinejs/vine'

export const userEmailSchema = vine.string().email({
  host_whitelist: ['gmail.com'],
})

export const userPasswordSchema = vine
  .string()
  .minLength(6)
  .maxLength(20)
  .regex(/[a-z A-Z 0-9]/)
export const userFullNameSchema = vine.string().minLength(6).maxLength(50)

export const pageSchema = vine.number().range([1, 100000])
export const perPageSchema = vine.number().range([1, 100])

export const folderNameSchema = vine.string().minLength(1).maxLength(20)
export const folderPathSchema = vine.string()

export const folderIdSchema = vine.number().range([1, 1000])

export const fileNameSchema = vine.string().minLength(6).maxLength(20)
export const fileDataSchema = vine.string()

export const jobsNameSchema = vine.string().minLength(1).maxLength(20)
export const jobsUrlSchema = vine.string().url()
export const jobsScheduleSchema = vine.string().minLength(1).maxLength(20)
export const jobsStatusSchema = vine.enum(['active', 'failed', 'success'])
