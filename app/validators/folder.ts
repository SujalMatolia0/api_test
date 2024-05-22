import vine from '@vinejs/vine'
import {
  fileDataSchema,
  fileNameSchema,
  folderIdSchema,
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

export const fileListValidator = vine.compile(
  vine.object({
    params: vine.object({
      page: pageSchema,
      perPage: perPageSchema,
    }),
  })
)

export const fileShowValidator = vine.compile(
  vine.object({
    name: fileNameSchema,
    folderId: folderIdSchema,
  })
)

export const fileDeleteValidator = vine.compile(
  vine.object({
    name: fileNameSchema,
    folderId: folderIdSchema,
  })
)

export const fileValidator = vine.compile(
  vine.object({
    name: fileNameSchema,
    data: fileDataSchema,
    folderId: folderIdSchema,
  })
)
