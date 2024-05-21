import vine from '@vinejs/vine'
import { fileNameSchema, folderNameSchema } from './index.js'

export const folderValidator = vine.compile(
  vine.object({
    name: folderNameSchema,
  })
)
