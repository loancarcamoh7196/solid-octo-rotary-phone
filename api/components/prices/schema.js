/**
 * * Schema de validación de Datos de Precios
 *  ? Nombre real tabla: com_precios
 * * Posee más campos
 * TODO preguntar si deben agregar a la consulta
 */
const Joi = require('joi');

/**
 * Campos reales de la Tabla
 */
const companyId = Joi.number().integer();
const id = Joi.number().integer().max(11);
const productoId = Joi.number().integer().max(10);
const lista = Joi.number();
const precio = Joi.number().precision(2);
const precioPublico = Joi.number().precision(2);
const precioIva = Joi.number().precision(2);

/**
 * Campos virtuales
 */
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createPriceSchema = Joi.object({
		companyId: companyId.required(),
		productoId,
    lista,
    precio,
    precioPublico,
    precioIva
});

const updatePriceSchema = Joi.object({
	companyId: companyId.required(),
	productoId,
	lista,
	precio,
	precioPublico,
	precioIva
});

const getPriceSchema = Joi.object({
	companyId: companyId.required(),
	id: id.required(),
});

const queryPriceSchema = Joi.object({
	limit,
	offset,
	// price,
	price_min,
	price_max: price_max.greater(Joi.ref('price_min')),
})
	.with('price_min', 'price_max')
	.with('price_max', 'price_min');

module.exports = {
	createPriceSchema,
	updatePriceSchema,
	getPriceSchema,
	queryPriceSchema,
};
