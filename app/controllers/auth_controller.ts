import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { name, password } = request.all()
    console.log(name, password)
  }

  async register({ request }: HttpContext) {
    const { name, password } = request.all()
    console.log(name, password)
  }
}
