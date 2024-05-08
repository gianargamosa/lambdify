import { service } from '../src/index.js'

export const createUser = service({
  validation: {
    schema: {
      request: {
        type: 'object',
        properties: {
          firstName: { type: 'string', nullable: false, minLength: 1 },
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
  handler: (event, context) => {
    return { data: event }
  }
})