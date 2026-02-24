import { CategoryFactory } from '#database/factories/category_factory'
import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    // 创建多条数据
    await CategoryFactory.createMany(3)

    const category = await Category.findOrFail(1)
    category.title = '新的分类名称'
    await category.save()
    console.log(category)
  }
}
