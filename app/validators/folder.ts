import vine from '@vinejs/vine'
import {
  fileDataSchema,
  fileNameSchema,
  fileSizeSchema,
  folderNameSchema,
  pageSchema,
  perPageSchema,
} from './index.js'

export const folderValidator = vine.compile(
  vine.object({
    name: folderNameSchema,
  })
)

export const folderListValidator = vine.compile(
  vine.object({
    params: vine.object({
      page: pageSchema,
      perPage: perPageSchema,
    }),
  })
)

export const fileValidator = vine.compile(
  vine.object({
    name: fileNameSchema,
    data: fileDataSchema,
    size: fileSizeSchema,
  })
)
