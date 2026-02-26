import Category from '#models/category'
import { createCategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({}: HttpContext) {
    return await Category.all()
  }

  async store({ request }: HttpContext) {
    const data = request.all() // 还需要进行数据验证
    // 得到验证之后的数据
    const payload = await createCategoryValidator.validate(data)
    const category = await Category.create(payload)
    return category
  }

  async show({ params }: HttpContext) {}

  async update({ params, request }: HttpContext) {}

  async destroy({ params }: HttpContext) {}
}
