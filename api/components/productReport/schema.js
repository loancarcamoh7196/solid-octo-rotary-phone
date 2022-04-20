/**
 * * Schema de validación de Datos de Price List type -
 *  ? Nombre real tabla (vista): v_producto_informe
 * * Posee más campos
 * TODO preguntar si deben agregar a la consulta
 */
const Joi = require('joi');

/**
 * Campos reales de la Tabla
 */
const companyId = Joi.number().integer();
const id = Joi.number();
const nombre = Joi.string().min(3).max(50);
const codigo = Joi.string().max(50);
const barra = Joi.string().max(50);
const listaId = Joi.number().integer();
const listaNombre = Joi.string();
const precio = Joi.number().precision(2);
const precioPublico = Joi.number().precision(2);
const precioIva = Joi.number().precision(2);
const precioId = Joi.number().integer();

//Campos para realizar filtros
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();
// const listaId= Joi.number().integer();

//Schema Vlaiacion para obtener info (params)
const getReportSchema = Joi.object({
	companyId: companyId.required(),
	id: id.required(),
	precioId: precioId.required()
});

const updateReportSchema = Joi.object({
	nombre,
	codigo,
	barra,
	listaId,
	precio,
	precioPublico,
	precioIva
});

const queryReportSchema = Joi.object({
	limit,
	offset,
	listaId,
	// price,
	price_min,
	price_max: price_max.greater(Joi.ref('price_min')),
});

module.exports = {
	getReportSchema,
	updateReportSchema,	
	queryReportSchema
};
