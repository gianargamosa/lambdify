import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'

const ajv = (
  new Ajv({
    allErrors: true,
    validateSchema: true,
  })
)

export const service = (options) => {
  return async (event, ctx) => {
    const eventWithDefaults = validateAndThrowErrors(
      event,
      options.validation.schema.request || {}
    )

    const response = validateResponse(
      options,
      eventWithDefaults,
      ctx
    )

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

  // const res = JSON.stringify(eventResponse)

  // BUG: schema validation not working properly
  // const {
  //   result,
  //   isValid,
  //   errors
  // } = validateSchema(res, options.validation.schema.response)

  // if (!isValid) return errors

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