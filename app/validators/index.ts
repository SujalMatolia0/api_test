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

export const folderNameSchema = vine.string().minLength(6).maxLength(20)

export const fileNameSchema = vine.string().minLength(6).maxLength(20)
