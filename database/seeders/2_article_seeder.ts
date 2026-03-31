import { ArticleFactory } from '#database/factories/article_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  // 只允许填充在测试和开发环境
  static environment: string[] = ['development', 'testing']
  async run() {
    // Write your database queries inside the run method
    await ArticleFactory.createMany(10)
  }
}
