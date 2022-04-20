/**
 * * Schema de validación de Datos de Lista de Precios 
 *  ? Nombre real tabla: mae_precios
 * * Posee más campos
 * TODO preguntar si deben agregar a la consulta
 */
const Joi = require('joi');

/**
 * Campos reales de la Tabla
 */
const id = Joi.number().integer().max(11);
const nombre = Joi.string().max(50);
const descripcion = Joi.string();
const porcentaje = Joi.number().integer();
const redondeo = Joi.number().integer();


const getPriceListSchema = Joi.object({
	id: id.required(),
});

const createPriceListSchema = Joi.object({
	nombre,
	descripcion,
	porcentaje,
	redondeo,
});

const updatePriceListSchema = Joi.object({
	nombre,
	descripcion,
	porcentaje,
	redondeo
});

const queryPriceListSchema = Joi.object({
	
})


module.exports = {
	createPriceListSchema,
	getPriceListSchema,
	updatePriceListSchema,
	queryPriceListSchema
};
