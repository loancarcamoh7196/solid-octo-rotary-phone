/**
 * Handler Error de Peticiones
 * @param {string} message Mensaje del error
 * @param {int} code Codigo HTTP de error
 * @returns Error compuesto
 */
const err = (message, code) =>{
	let e = new Error(message);

	if (code) {
		e.statusCode = code;
	}

	return e;
}

module.exports = err;
