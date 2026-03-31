import Article from '#models/article'
import { createArticleValidator, updateArticleValidator } from '#validators/article'
import type { HttpContext } from '@adonisjs/core/http'

export default class ArticlesController {
  async index({ request }: HttpContext) {
    return Article.query().paginate(request.input('page', 1))
  }

  async store({ request }: HttpContext) {
    const payload = await createArticleValidator.validate({ request })
    return Article.create(payload)
  }
  async show({ params }: HttpContext) {
    return Article.findOrFail(params.id)
  }
  async update({ params, request }: HttpContext) {
    const payload = await updateArticleValidator.validate({ request })
    const article = await Article.findByOrFail(params.id)
    article.merge(payload)
    await article.save()
    return article
  }
  async destroy({ params }: HttpContext) {
    const article = await Article.findByOrFail(params.id)
    await article.delete()
  }
}
