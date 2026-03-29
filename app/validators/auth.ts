import vine from '@vinejs/vine'
import { FormValidator } from './zh/form_validator.js'

const rules = {
  name: vine.string().minLength(3).maxLength(20),
}

export const loginValidator = FormValidator.rules(() => ({
  name: rules.name.exists(async (db, value, _field) => {
    // console.trace(field)
    // 查询数据是否存在
    return !!(await db.from('users').where('name', value).first())
  }),
  password: vine.string().minLength(6).maxLength(20),
})).fields({ name: '用户名', password: '密码' })

export const registerValidator = FormValidator.rules(() => ({
  name: rules.name.exists(async (db, value, _field) => {
    // console.trace(field)
    return !(await db.from('users').where('name', value).first())
  }),
  password: vine.string().minLength(6).maxLength(20),
})).fields({ name: '用户名', password: '密码' })
