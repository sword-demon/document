import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import BasesController from './bases_controller.js'
import { loginValidator } from '#validators/auth'

export default class AuthController extends BasesController {
  async login({ request, auth }: HttpContext) {
    const { name, password } = request.all()
    // const user = await User.findBy('name', name)

    // 登录表单验证
    await loginValidator.validate({ request })

    try {
      const user = await User.verifyCredentials(name, password)
      // if (!user) {
      //   return this.error('用户不存在')
      // }
      // if (!(await hash.verify(user.password, password))) {
      //   return this.error('密码错误')
      // }
      const token = await auth.use('api').createToken(user)
      return this.success('登录成功', { token, user })
    } catch (error) {
      return this.error('用户名或密码错误')
    }

    // 生成 token
    // const token = await User.accessTokens.create(user)
    // return this.success('登录成功', { token, user })
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
