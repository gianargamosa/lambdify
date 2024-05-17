import { service } from '../index'
import { sampleSchemaValidation } from './sample-schema'

export const createUser = service({
  validation: {
    schema: {
      request: {
        type: 'object',
        properties: {
          firstName: { type: 'string', nullable: false, minLength: 20 },
          age: { type: 'number', nullable: false },
          lastName: { type: 'string' },
        },
        required: ['firstName', 'lastName'],
      },
      response: {
        default: {
          data: {
            type: 'object',
            user: {
              type: 'object',
              properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                age: { type: 'number' },
              },
            },
          },
        },
      },
    },
  },
  middlewares: [
    sampleSchemaValidation(),
  ],
  handler: async (event, context) => {
    try {
      return { data: event }
    } catch (err) {
      console.log('[paymentError]: ', err)
    }
  }
})