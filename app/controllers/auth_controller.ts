import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import BasesController from './bases_controller.js'
import hash from '@adonisjs/core/services/hash'

export default class AuthController extends BasesController {
  async login({ request }: HttpContext) {
    const { name, password } = request.all()
    const user = await User.findBy('name', name)
    if (!user) {
      return this.error('用户不存在')
    }
    if (!(await hash.verify(user.password, password))) {
      return this.error('密码错误')
    }

    // 生成 token
    const token = await User.accessTokens.create(user)
    return this.success('登录成功', { token, user })
  }

  async register({ request }: HttpContext) {
    const { name, password } = request.all()
    const user = await User.findBy('name', name)
    if (user) {
      return this.error('用户已存在')
    }
    console.log(name, password)
  }
}
