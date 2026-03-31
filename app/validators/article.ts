import vine from '@vinejs/vine'
import { FormValidator } from './zh/form_validator.js'

/**
 * Validator to validate the payload when creating
 * a new article.
 */
export const createArticleValidator = FormValidator.rules(() => ({
  title: vine.string().minLength(3).maxLength(255),
  content: vine.string().minLength(3),
  categoryId: vine.number().exists(async (db, value, _field) => {
    return !!(await db.from('categories').where('id', value).first())
  }),
}))

/**
 * Validator to validate the payload when updating
 * an existing article.
 */
export const updateArticleValidator = FormValidator.rules(() => ({
  title: vine.string().minLength(3).maxLength(255),
  content: vine.string().minLength(3),
  categoryId: vine.number().exists(async (db, value, _field) => {
    return !!(await db.from('categories').where('id', value).first())
  }),
}))
