import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import BasesController from './bases_controller.js'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController extends BasesController {
  /**
   * The login function in the TypeScript code snippet handles user authentication by validating login
   * credentials, verifying user credentials, creating a token for authentication, and returning a
   * success message with the token and user information.
   * @param {HttpContext}  - The `login` method you provided is an asynchronous function that handles
   * user login functionality. Here is an explanation of the parameters used in the function:
   * @returns The `login` function is returning a success response with a message "登录成功" (login
   * successful) along with an object containing the generated token and user information.
   */
  async login({ request, auth }: HttpContext) {
    // const { name, password } = request.all()
    // const user = await User.findBy('name', name)

    // 登录表单验证
    const payload = await loginValidator.validate({ request })
    const user = await User.verifyCredentials(payload.name, payload.password)
    const token = await auth.use('api').createToken(user)
    return this.success('登录成功', { token, user })

    // try {
    //   const user = await User.verifyCredentials(name, password)
    //   // if (!user) {
    //   //   return this.error('用户不存在')
    //   // }
    //   // if (!(await hash.verify(user.password, password))) {
    //   //   return this.error('密码错误')
    //   // }
    //   const token = await auth.use('api').createToken(user)
    //   return this.success('登录成功', { token, user })
    // } catch (error) {
    //   return this.error('用户名或密码错误')
    // }

    // 生成 token
    // const token = await User.accessTokens.create(user)
    // return this.success('登录成功', { token, user })
  }

  /**
   * The `register` function asynchronously validates and creates a new user based on the request data.
   * @param {HttpContext}  - The `register` method is an asynchronous function that takes an object
   * `HttpContext` as a parameter. Within the method, it first validates the request data using a
   * `registerValidator` object, then creates a new user record in the database using the validated
   * payload, and finally returns a success message along with
   * @returns The code is returning a success message "注册成功" along with the user object that was
   * created after validating the request payload and creating a new user in the database.
   */
  async register({ request, auth }: HttpContext) {
    // const { name, password } = request.all()
    const payload = await registerValidator.validate({ request })
    const user = await User.create(payload)
    const token = await auth.use('api').createToken(user)
    return this.success('注册成功', { token, user })
  }
}
