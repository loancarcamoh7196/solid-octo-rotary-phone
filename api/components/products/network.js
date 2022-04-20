/**
 ** Archivo Controlador de Rutas para Productos
 *? URI: /api/v1/products
 */
const express = require('express');
const response = require('@network/response');
const Controller = require('./index');
const { getProductSchema, updateProductSchema, queryProductSchema } = require('./schema');

const router = express.Router(); // Manejador de Rutas

/**
 * Ruta encargada de listar empresas
 * @param {request} req Petición HTTP
 * @param {response} res Respuesta de la petición
 * @param {*} next Excepción arrojada
 */
router.get('/', (req, res, next) => {
	// console.log(req.query)
	const { empresaBd } = req.query;

	Controller.list(empresaBd)
		.then((lista) => {
			response.success(req, res, lista, 200);
		})
		.catch(next);
});

/**
 * Ruta encargada de mostrar empresa especifico
 */
router.get('/:pdt_index', (req, res, next) => {
	// console.log(req.query)
	const { empresaBd } = req.query;

	Controller.get(empresaBd, req.params)
		.then((user) => {
			response.success(req, res, user, 200);
		})
		.catch(next);
});

/**
 * Ruta encargada de agregar empresa
 */
router.post('/', (req, res, next) => {
	const { empresaBd } = req.query;

	Controller.insert(empresaBd, req.body)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch(next);
});

/**
 * Ruta encargada de modificar empresa especifico
 */
router.patch('/:pdt_index', (req, res, next) => {
	const { empresaBd } = req.query;
	// console.log('Params: ',req.params);
	// console.log('Body: ', req.body);

	// const { id } = req.params;

	
	Controller.update(empresaBd, req.body, req.params)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch(next);
});

/**
 * Ruta encargada de eliminar empresa
 */
router.delete('/:rut', (req, res, next) => {
	const { empresaBd } = req.query;

	Controller.drop(empresaBd, req.params)
		.then((user) => {
			response.success(req, res, user, 200);
		})
		.catch(next);
});

module.exports = router;
