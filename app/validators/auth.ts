import vine from '@vinejs/vine'
import { FormValidator } from './zh/form_validator.js'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

// 尽量避免全局变量，因为全局变量会污染全局空间，导致代码难以维护

// const rules = {
//   name: vine.string().minLength(3).maxLength(20),
// }

export const loginValidator = FormValidator.rules(() => {
  // 定义局部变量
  let userInstance: User | null = null
  return {
    name: vine
      .string()
      .minLength(3)
      .maxLength(20)
      .exists(async (_db, value, _field) => {
        // console.trace(field)
        // 查询数据是否存在
        userInstance = await User.query().where('name', value).first()
        return !!userInstance
      }),
    password: vine
      .string()
      .minLength(6)
      .maxLength(20)
      .exists(async (_db, value, _field) => {
        if (userInstance) {
          return !!(await hash.verify(userInstance?.password, value))
        }
        return true
      }),
  }
})
  .fields({ name: '用户名', password: '密码' })
  .messages({
    'password.database.exists': '密码错误',
  })

export const registerValidator = FormValidator.rules(() => ({
  name: vine
    .string()
    .minLength(3)
    .maxLength(20)
    .exists(async (db, value, _field) => {
      // console.trace(field)
      return !(await db.from('users').where('name', value).first())
    }),
  password: vine.string().minLength(6).maxLength(20),
}))
  .fields({ name: '用户名', password: '密码' })
  .messages({
    'name.database.exists': '用户名已存在',
  })
