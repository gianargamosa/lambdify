import Ajv from 'ajv'

const ajv = (
  new Ajv({
    allErrors: true,
    validateSchema: true,
  })
)

export const service = (options) => {
  return async (event, ctx, callback) => {
    const chainMiddlewares = ([firstMiddleware, ...restOfMiddlewares]: any) => {
      if (firstMiddleware) {
        return (e, c) => {
          try {
            return firstMiddleware(e, c, chainMiddlewares(restOfMiddlewares))
          } catch (error) {
            return Promise.reject(error)
          }
        }
      }

      return options.handler
    }

    const eventWithDefaults = validateAndThrowErrors(
      event,
      options.validation.schema.request || {}
    )

    const response = validateResponse(
      options,
      eventWithDefaults,
      ctx
    )

    chainMiddlewares(options.middlewares)(eventWithDefaults, ctx)
      .then(result => callback(null, result))
      .catch((err) => {
        callback(err, null)
      })

    return response
  }
}

const validateAndThrowErrors = (event, schema) => {
  const {
    result,
    isValid,
    errors
  } = validateSchema(event, schema)

  if (!isValid) return errors

  return result
}

const validateResponse = (options, eventWithDefaults, ctx) => {
  const eventResponse = options.handler(eventWithDefaults, ctx)
  // TODO: Implement API response validation and Open API direct generation
  return eventResponse
}

const validateSchema = (event, schema) => {
  const payload = JSON.parse(event)

  const validate = ajv.compile(schema)

  const isValid = validate(payload)

  const errors = isValid ? null : validate.errors?.map((error) => {

    const fieldError = isEmpty(error.instancePath) ? error.params.missingProperty : error.instancePath.replace(/\//g, "")

    return {
      [fieldError]: error.message
    }
  })

  return {
    result: JSON.parse(event),
    isValid,
    errors
  }
}

const isEmpty = (str) => (!str?.length);