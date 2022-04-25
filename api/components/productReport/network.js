/**
 ** Archivo Controlador de Rutas para usuario
 *? URI: /api/v1/users
 */
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const response = require('@network/response');
const Controller = require('./index');
const { getReportSchema, updateReportSchema, queryReportSchema } = require('./schema');

const router = express.Router(); // Manejador de Rutas

/**
 * Ruta encargada de listar empresas
 * @param {request} req Petición HTTP
 * @param {response} res Respuesta de la petición
 * @param {*} next Excepción arrojada
 */
router.get(
	'/:lista_id',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		const { empresaBd } = req.query;

		try {
			const lista = await Controller.get(empresaBd, req.body, req.params);
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
router.get(
	'/:producto_id/detail/:precio_id',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		const { empresaBd } = req.query;

		try {
			const user = await Controller.get(empresaBd, req.body, req.params);
			return response.success(req, res, user, 200);
		} catch (error) {
			response.error(req, res, error, 400)
			next(error);
		}
	}
);

/**
 * Ruta encargada de agregar empresa
 */
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		const { empresaBd } = req.query;
		try {
			const user = await Controller.insert(empresaBd, req.body);
			return response.success(req, res, user, 201);
		} catch (error) {
			response.error(req, res, error, 400)
			next(error);
		}
	}
);

/**
 * Ruta encargada de modificar empresa especifico
 */
router.patch(
	'/:producto_id/edit/:lista_id',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		const { empresaBd } = req.query;
		// console.log('Params: ',req.params);
		// console.log('Body: ', req.body);
		try {
			const user = Controller.update(empresaBd, req.body, req.params);
			return response.success(req, res, user, 201);
		} catch (error) {
			response.error(req, res, error, 400)
			next(error);
		}
	}
);

/**
 * Ruta encargada de eliminar empresa
 */
router.delete(
	'/:producto_id/delete/:lista_id',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		const { empresaBd } = req.query;

		try {
			const user = Controller.drop(empresaBd, req.params);
			response.success(req, res, user, 200);
		} catch (error) {
			response.error(req, res, error, 400)
			next(error);
		}
	}
);

module.exports = router;
