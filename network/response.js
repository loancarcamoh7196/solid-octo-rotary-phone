/**
 * Metodo que maneja respuesta existosa 
 * @param {request} req Request HTTP
 * @param {response} res Respuesta a petición
 * @param {string} message Mensaje de respuesta de petición
 * @param {int} status Codigo http de respuesta
 */
exports.success = (req, res, message, status) => {
  let statusCode = status|| 200;
  let statusMessage = message || '';
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: statusMessage,
  })
}

/**
 * Metodo que maneja respuesta con error
 * @param {request} req Request HTTP
 * @param {response} res Respuesta a petición
 * @param {string} message Mensaje de respuesta de petición
 * @param {int} status Codigo http de respuesta
 */
exports.error = (req,res, message, status)=> {
  let statusCode = status || 500;
  let statusMessage = message || 'Internal server error';

  res.status(statusCode).send({
    error: true,
    status: statusCode,
    body: statusMessage
  })
}
