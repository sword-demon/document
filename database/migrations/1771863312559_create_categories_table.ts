import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // 栏目的名称 不允许为空
      table.string('title', 100).notNullable().comment('栏目的名称')
      // 父子级的关系
      table.integer('parent_id').nullable().defaultTo(0).comment('父级 id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
