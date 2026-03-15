import vine from '@vinejs/vine'
import { FormValidator, formValidator } from './zh/form_validator.js'
// import { validateMessageProvider } from './zh/form_validator.js'

// export const createCategoryValidator = vine.compile(
//   vine.object({
//     title: vine.string().trim().minLength(1).maxLength(50),
//   })
// )

// export const categoryMessageProvider = validateMessageProvider({}, { title: '栏目名称' })

const rules = {
  title: vine.string().trim().minLength(3).maxLength(50),
}

const fileds = {
  title: '栏目名称',
}

// export const createCategoryValidator = formValidator(rules, {}, fileds)
export const createCategoryValidator = FormValidator.rules(rules)

export const updateCategoryValidator = formValidator({ ...rules }, {}, fileds)
