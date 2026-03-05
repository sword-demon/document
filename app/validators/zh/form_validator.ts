import { SimpleMessagesProvider } from '@vinejs/vine'
import { validateFields, validateMessage } from './lang.js'

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
