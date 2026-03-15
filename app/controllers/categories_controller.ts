import Category from '#models/category'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({}: HttpContext) {
    return await Category.all()
  }

  async store({ request }: HttpContext) {
    // 省事写法
    // const payload = await request.validateUsing(createCategoryValidator, categoryMessageProvider)
    const payload = await createCategoryValidator.validate(request)
    const category = await Category.create(payload)
    return category
  }

  async show({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return category
  }

  async update({ params, request }: HttpContext) {
    const payload = await updateCategoryValidator.validate(request)
    const category = await Category.findByOrFail(params.id)
    category.merge(payload)
    await category.save()
    return category
  }

  async destroy({ params }: HttpContext) {
    const category = await Category.findByOrFail(params.id)
    await category.delete()
  }
}
