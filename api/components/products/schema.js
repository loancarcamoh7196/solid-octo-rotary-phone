/**
 * * Schema de validación de Datos de Product [ 
 *  ? Nombre real tabla: mae_productos
 * * Posee más campos
 * TODO preguntar si deben agregar a la consulta
 */
const Joi = require('joi');

/**
 * Campos reales de la Tabla 
 */
const index= Joi.number().integer().max(11);
const nombre = Joi.string().min(3).max(50);
const codigo = Joi.string().max(50);
const barra = Joi.string().max(50);

/**
 * Campos virtuales o campo para filtro
 */
const detallado = Joi.boolean();
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
	nombre,
	codigo,
	barra,
});

const updateProductSchema = Joi.object({
	nombre,
	codigo,
	barra,
});

const getProductSchema = Joi.object({
	index: index.required(),
});

const queryProductSchema = Joi.object({
	detallado,
	limit,
	offset,
	// price,
	price_min,
	price_max: price_max.greater(Joi.ref('price_min')),
})
	.with('price_min', 'price_max')
	.with('price_max', 'price_min');

module.exports = {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
	queryProductSchema,
};
