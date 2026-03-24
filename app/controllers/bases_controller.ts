import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'

@inject()
export default abstract class BasesController {
  constructor(protected ctx: HttpContext) {}

  success(message = '请求成功', data: {}) {
    return this.ctx.response.status(200).json({ data, message })
  }

  error(message = '请求失败', code = 400) {
    return this.ctx.response.status(code).json({ message })
  }
}
