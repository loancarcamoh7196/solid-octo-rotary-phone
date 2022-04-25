/**
 ** Archivo Controlador de Rutas para usuario
 *? URI: /api/v1/users
 */
const express = require('express');
const passport = require('passport');

const response = require('@network/response');
const Controller = require('./index');
const validationHandler = require('@utils/validation.handler');
const { getCompanySchema, updateCompanySchema, queryCompanySchema, createCompanySchema } = require('./schema');

const router = express.Router(); // Manejador de Rutas

/**
 * Ruta encargada de listar empresas
 * @param {request} req Petición HTTP
 * @param {response} res Respuesta de la petición
 * @param {*} next Excepción arrojada
 */
router.get('/',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const lista = await Controller.list();
			return response.success(req, res, lista, 200);
		} catch (error) {
			response.error(req, res, error, 400)
			next(error);
		}
	}
);

/**
 * Ruta encargada de mostrar empresa especifico
 */
router.get('/:rut',
	passport.authenticate('jwt', { session: false }),
	validationHandler(getCompanySchema, 'params'),
	async (req, res, next) => {
		try {
			const users = await Controller.get(req.params);
			return response.success(req, res, users, 200);	
		} catch (error) {
			response.error(req, res, error, 400)
			next(error);
		}
	// Controller.get(req.params)
	// 	.then((user) => {
	// 		response.success(req, res, user, 200);
	// 	})
	// 	.catch(next);
});

/**
 * Ruta encargada de agregar empresa
 */
router.post('/',
	passport.authenticate('jwt', { session: false }),
	validationHandler(createCompanySchema, 'body'),
	async (req, res, next) => {
		try {
			const user = 	await Controller.insert(req.body)
			return response.success(req, res, user, 201);
		} catch (error) {
			response.error(req, res, error, 400);
			next(error);
		}	
	}
);

/**
 * Ruta encargada de modificar empresa especifico
 */
router.patch('/:rut',
	passport.authenticate('jwt', { session: false }),
	validationHandler(getCompanySchema, 'params'),
	validationHandler(updateCompanySchema, 'body'),
	async (req, res, next) => {
	// console.log('Params: ',req.params);
	// console.log('Body: ', req.body);
		try {
			user = await Controller.update(req.body, req.params);
			return response.success(req, res, user, 201);
		} catch (error) {
			response.error(req, res, error, 400);
			next(error);
		}
	}
);

/**
 * Ruta encargada de eliminar empresa
 */
router.delete('/:rut',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const user = 	await Controller.drop(req.params);
			return response.success(req, res, user, 200);
		} catch (error) {
			response.error(req, res, error, 400);
			next(error);
		}
	}
);

module.exports = router;
