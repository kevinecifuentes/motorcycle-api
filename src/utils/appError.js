//La clase Error, la trae el lenguaje por defecto, no hay necesidad de crearla.
class AppError extends Error {
  //le pasamos los parámetros que va a recibir la clase
  constructor(message, statusCode) {
    //llamamos la clase padre, que es Error. AppError se construye desde Erros
    super(message)

    //vamos a crearle una propiedad a la clase
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
