import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(50),
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(50),
  })
)
