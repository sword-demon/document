import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { validateFields, validateMessage } from './lang.js'
import type { HttpContext, Request } from '@adonisjs/core/http'
import { compose } from '@adonisjs/core/helpers'

export const validateMessageProvider = (messages = {}, fields = {}) => {
  return {
    messagesProvider: new SimpleMessagesProvider(
      {
        ...validateMessage,
        ...messages,
      },
      {
        ...validateFields,
        ...fields,
      }
    ),
  }
}

export const formValidator = (rules: Record<string, any>, messages = {}, fields = {}) => {
  const validator = vine.compile(vine.object(rules))
  const messageProvider = validateMessageProvider(messages, fields)

  return (request: Request) => {
    return request.validateUsing(validator, messageProvider)
  }
}

type CtxType = Partial<HttpContext>

export class FormValidator<T extends Record<string, any>> {
  private validateFields: Record<string, any> = {}
  private validateMessages: Record<string, any> = {}
  // private compile?: VineValidator<any, Record<string, any> | undefined>

  // 泛型自动推断
  constructor(protected callback: (ctx: CtxType) => T) {}

  static rules<D extends Record<string, any>>(callback: (ctx: CtxType) => D) {
    return new FormValidator(callback)
  }

  execute<D extends Record<string, any>>(rules: D) {
    return vine.compile(vine.object(rules))
  }

  messages(messages: Record<string, any>) {
    this.validateMessages = messages
    return this
  }

  fields(fields: Record<string, any>) {
    this.validateFields = fields
    return this
  }

  async validate(ctx: CtxType) {
    const rules = this.callback(ctx)
    const compile = this.execute(rules)
    const messageProvider = validateMessageProvider(this.validateMessages, this.validateFields)
    const result = await ctx.request?.validateUsing(compile, messageProvider)
    return result as ReturnType<typeof compile.validate>
  }
  // async validate(request: Request): Promise<T> {
  //   const result = await request.validateUsing(
  //     this.compile!,
  //     validateMessageProvider(this.validateMessages, this.validateFields)
  //   )
  //   return result
  // }
}
