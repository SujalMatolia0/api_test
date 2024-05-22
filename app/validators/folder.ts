import vine from '@vinejs/vine'
import {
  fileDataSchema,
  fileNameSchema,
  fileSizeSchema,
  folderNameSchema,
  folderPathSchema,
} from './index.js'

export const folderValidator = vine.compile(
  vine.object({
    name: folderNameSchema,
    path: folderPathSchema,
  })
)

export const fileValidator = vine.compile(
  vine.object({
    name: fileNameSchema,
    data: fileDataSchema,
    size: fileSizeSchema,
  })
)
