import vine, { SimpleMessagesProvider, VineValidator } from '@vinejs/vine'
import { validateFields, validateMessage } from './lang.js'
import type { Request } from '@adonisjs/core/http'

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

export class FormValidator {
  private validateFields: Record<string, any> = {}
  private validateMessages: Record<string, any> = {}
  private compile?: VineValidator<any, Record<string, any> | undefined>

  static rules(rules: Record<string, any>) {
    const validate = vine.compile(vine.object(rules))

    const instance = new FormValidator()
    instance.compile = validate
    return instance
  }

  messages(messages: Record<string, any>) {
    this.validateMessages = messages
    return this
  }

  fields(fields: Record<string, any>) {
    this.validateFields = fields
    return this
  }

  async validate(request: Request) {
    const result = await request.validateUsing(
      this.compile!,
      validateMessageProvider(this.validateMessages, this.validateFields)
    )
    return result
  }
}
