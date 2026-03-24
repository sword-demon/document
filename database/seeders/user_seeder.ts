import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const users = await UserFactory.createMany(3)
    let user = users[0]
    user.name = 'admin'
    await user.save()

    let user2 = users[1]
    user2.name = 'user'
    await user2.save()
  }
}
