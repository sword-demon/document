import vine from '@vinejs/vine'
import { validateMessageProvider } from './zh/form_validator.js'

export const createCategoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(50),
  })
)

export const categoryMessageProvider = validateMessageProvider({}, { title: '栏目名称' })

export const updateCategoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(50),
  })
)
