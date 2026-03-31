import factory from '@adonisjs/lucid/factories'
import Article from '#models/article'

export const ArticleFactory = factory
  .define(Article, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      categoryId: 1,
    }
  })
  .build()
