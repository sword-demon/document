import { Role } from '#enums/role'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    // console.log('admin middleware', ctx)
    // console.log(ctx.auth.use())

    const user = await ctx.auth.authenticate()
    console.log(user.toJSON())

    if (user.role !== Role.Admin) {
      // ctx.response.status(403).send({ message: '你不是管理员' })
      // return
      throw new Exception('你不是管理员', {
        code: 'E_UNAUTHORIZED_ACCESS',
        status: 403,
      })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
