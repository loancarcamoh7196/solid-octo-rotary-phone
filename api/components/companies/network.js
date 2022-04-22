/**
 ** Archivo Controlador de Rutas para usuario
 *? URI: /api/v1/users
 */
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const response = require('@network/response');
const Controller = require('./index');
const { getCompanySchema, updateCompanySchema, queryCompanySchema } = require('./schema');

const router = express.Router(); // Manejador de Rutas

/**
 * Ruta encargada de listar empresas
 * @param {request} req Petición HTTP
 * @param {response} res Respuesta de la petición
 * @param {*} next Excepción arrojada
 */
router.get('/',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		Controller.list()
			.then((lista) => {
				response.success(req, res, lista, 200);
			})
			.catch(next);
	}
);

/**
 * Ruta encargada de mostrar empresa especifico
 */
router.get('/:rut',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
	Controller.get(req.params)
		.then((user) => {
			response.success(req, res, user, 200);
		})
		.catch(next);
});

/**
 * Ruta encargada de agregar empresa
 */
router.post('/',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
	Controller.insert(req.body)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch(next);
});

/**
 * Ruta encargada de modificar empresa especifico
 */
router.patch('/:rut',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
	// console.log('Params: ',req.params);
	// console.log('Body: ', req.body);

	// const { id } = req.params;

	Controller.update(req.body, req.params)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch(next);
});

/**
 * Ruta encargada de eliminar empresa
 */
router.delete('/:rut',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
	Controller.drop(req.params)
		.then((user) => {
			response.success(req, res, user, 200);
		})
		.catch(next);
});

module.exports = router;
