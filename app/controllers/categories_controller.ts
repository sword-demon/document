import Category from '#models/category'
import { categoryMessageProvider, createCategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({}: HttpContext) {
    return await Category.all()
  }

  async store({ request }: HttpContext) {
    // 省事写法
    const payload = await request.validateUsing(createCategoryValidator, categoryMessageProvider)
    const category = await Category.create(payload)
    return category
  }

  async show({ params }: HttpContext) {}

  async update({ params, request }: HttpContext) {
    console.log(params)
    console.log(request.all())
  }

  async destroy({ params }: HttpContext) {}
}
