/**
 * * Schema de validación de Datos de Usuarios
 *  ? Nombre real tabla: usr_
 * * Posee más campos
 * TODO preguntar si deben agregar a la consulta
 */
const Joi = require('joi');

/**
 * Campos reales de la Tabla
 */
const id = Joi.number().integer();
const empRut = Joi.number().integer();
const username = Joi.string().max(30);
const password = Joi.string();
const token = Joi.string();
const email = Joi.string();

const createUserSchema = Joi.object({
	empRut: empRut.required(),
	username,
	password,
	token
});

const updateUserSchema = Joi.object({
	empRut,
	username,
	password,
	token,
	email
});

const getUserSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
};
