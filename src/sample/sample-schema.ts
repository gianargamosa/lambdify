export const sampleSchemaValidation = () => {
  return (event, context, next) => {
    return next(event, context)
      .then((result) => {
        console.log('hello from middleware')
        return result
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}