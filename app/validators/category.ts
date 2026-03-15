import vine from '@vinejs/vine'
import { FormValidator } from './zh/form_validator.js'
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

// const fileds = {
//   title: '栏目名称',
// }

// export const createCategoryValidator = formValidator(rules, {}, fileds)
export const createCategoryValidator = FormValidator.rules(rules)

export const updateCategoryValidator = FormValidator.rules({
  title: vine
    .string()
    .trim()
    .minLength(3)
    .maxLength(50)
    .unique(async (db, value, field) => {
      // 通过数据库查询一下
      // 需要把自己排除掉
      console.log(field)
      const category = await db
        .from('categories')
        .where('title', value)
        .whereNot('id', field.data.params.id)
        .first()
      return !category
    }),
})
