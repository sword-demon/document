import factory from '@adonisjs/lucid/factories'
import Article from '#models/article'
import Category from '#models/category'

export const ArticleFactory = factory
  .define(Article, async ({ faker }) => {
    const category = await Category.query().orderByRaw('rand()').limit(1).first()
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      categoryId: category?.id,
    }
  })
  .build()
