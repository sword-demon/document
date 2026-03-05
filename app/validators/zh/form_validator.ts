import vine, { SimpleMessagesProvider } from '@vinejs/vine'
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
