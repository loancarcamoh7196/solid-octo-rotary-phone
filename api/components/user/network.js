/**
 * * Archivo Controlador de Rutas para usuario
 * ? URI: /api/users
 */
const express = require('express');
const passport = require('passport');
const response = require('@network/response');
const Controller = require('./index');
const validationHandler = require('@utils/validation.handler');
const {createUserSchema, getUserSchema, updateUserSchema }  = require('./schema');

const router = express.Router(); // Manejador de Rutas

/**
 * Ruta encargada de listar usuarios
 * @param {request} req Petición HTTP
 * @param {response} res Respuesta de la petición
 * @param {*} next Excepción arrojada
 */
router.get(
  '/',
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
 * Ruta encargada de mostrar usuario especifico
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getUserSchema, 'params'),
  async (req, res, next)=> {
    try {
      const  user = await Controller.get(req.params);
      return response.success(req, res, user, 200);
    } catch (error) {
      response.error(req, res, error, 400)
			next(error);
    }
  }
);

/**
 * Ruta encargada de agregar usuario
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await Controller.insert(req.body);
      return response.success(req, res, user, 201);
    } catch (error) {
      response.error(req, res, error, 400)
			next(error);
    }
  }
);

/**
 * Ruta encargada de modificar usuario especifico
 */
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(updateUserSchema, 'params'),
  async (req, res, next)=> {
    // console.log('Params: ',req.params);
    // console.log('Body: ', req.body);
    // const { id } = req.params;
    try {
      const  user = await Controller.update(req.body, req.params);
      return response.success(req, res, user, 201);
    } catch (error) {
      response.error(req, res, error, 400)
			next(error);
    }
  }
);


/**
 * Ruta encargada de eliminar usuario
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await Controller.drop(req.params);
      return response.success(req, res, user, 200);
    } catch (error) {
      response.error(req, res, error, 400)
			next(error);
    }
  }
);

module.exports = router;
