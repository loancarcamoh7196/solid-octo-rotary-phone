/**
 * * Archivo Controlador de Rutas para usuario
 * ? URI: /api/users
 */
const express = require('express');
const response = require('@network/response');
const auth = require('../auth');
const Controller = require('./index');
const {createUserSchema, getUserSchema, updateUserSchema }  = require('./schema');

const router = express.Router(); // Manejador de Rutas


/**
 * Ruta encargada de listar usuarios
 * @param {request} req Petición HTTP
 * @param {response} res Respuesta de la petición
 * @param {*} next Excepción arrojada
 */
router.get('/',
  (req, res, next) => {
    Controller.list()
      .then((lista) => {
        response.success(req, res, lista, 200);
      })
      .catch(next);
  }
);

/**
 * Ruta encargada de mostrar usuario especifico
 */
router.get('/:id',
  (req, res, next)=> {
    Controller.get(req.params)
      .then((user) => {
        response.success(req, res, user, 200);
      })
      .catch(next);
  }
);

/**
 * Ruta encargada de agregar usuario
 */
router.post('/',
  (req, res, next) => {
    Controller.insert(req.body)
      .then((user)=> {
        response.success(req, res, user, 201)
      })
      .catch(next)
  }
);

/**
 * Ruta encargada de modificar usuario especifico
 */
router.patch('/:id',
  (req, res, next)=> {
    // console.log('Params: ',req.params);
    // console.log('Body: ', req.body);

    const { id } = req.params;

    Controller.update(req.body, req.paramsid)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch(next);
  }
);


/**
 * Ruta encargada de eliminar usuario
 */
router.delete('/:id', (req, res, next) => {
	Controller.drop(req.params)
		.then((user) => {
			response.success(req, res, user, 200);
		})
		.catch(next);
  }
);

module.exports = router;
