/**
 * * Schema de validación de Datos de Company
 *  ? Nombre real tabla: emp_
 * * Posee más campos
 * TODO preguntar si deben agregar a la consulta
 */
const Joi = require('joi');

/**
 * Campos reales de la Tabla
 */
// const rut = Joi.number().integer().max(11);
const rut = Joi.string().max(10);
const razon = Joi.string();
const bdNombre = Joi.string();
const uri = Joi.string();


const createCompanySchema = Joi.object({
	rut: rut.required(),
	razon: razon.required(),
	bdNombre: bdNombre.required(),
	uri
});

const updateCompanySchema = Joi.object({
	razon,
	bdNombre,
	uri
});

const getCompanySchema = Joi.object({
	rut: rut.required(),
});

const queryCompanySchema = Joi.object({
	
});


module.exports = {
	createCompanySchema,
	updateCompanySchema,
	getCompanySchema,
	queryCompanySchema
};
