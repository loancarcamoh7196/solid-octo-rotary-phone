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
	(req, res, next) => {
		const { empresaBd } = req.query;

		Controller.list(empresaBd, req.body, req.params)
		.then( lista => {
			response.success(req, res, lista, 200);
		})
		.catch (error => {
			next(response.error(req, res, error, 400));
		})
	}
);

/**
 * Ruta encargada de mostrar empresa especifico
 */
router.get(
	'/:producto_id/detail/:precio_id',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { empresaBd } = req.query;

		Controller.get(empresaBd, req.body, req.params)
			.then( prod => {
				response.success(req, res, prod, 200);
			})
			.catch (error => {
				next(response.error(req, res, error, 400));
			})
	}
);

/**
 * Ruta encargada de agregar empresa
 */
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { empresaBd } = req.query;
		
		Controller.insert(empresaBd, req.body)
			.then(prod => {
				response.success(req, res, prod, 201);
			})
			.catch (error=> {
			next(response.error(req, res, error, 400));
			})
	}
);

/**
 * Ruta encargada de modificar empresa especifico
 */
router.patch(
	'/:producto_id/edit/:lista_id',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { empresaBd } = req.query;
		Controller.update(empresaBd, req.body, req.params)
			.then( prod => { response.success(req, res, prod, 201);
			})
			.catch (error =>  {
				next(response.error(req, res, error, 400));
			})
	}
);

/**
 * Ruta encargada de eliminar empresa
 */
router.delete(
	'/:producto_id/delete/:lista_id',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		const { empresaBd } = req.query;

		Controller.drop(empresaBd, req.params)
			.then( prod => {
				response.success(req, res, prod, 200);
			})
			.catch(error =>  {
				next(response.error(req, res, error, 400));
			})
	}
);

module.exports = router;
