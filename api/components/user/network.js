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
  (req, res, next) => {
    Controller.list().
      then(lista => {
        response.success(req, res, lista, 200);
      })
      .catch (error => {
        next(response.error(req, res, error, 400));
      })
  }
);

/**
 * Ruta encargada de mostrar usuario especifico
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getUserSchema, 'params'),
  (req, res, next)=> {
    Controller.get(req.params).
      then( user => {
        response.success(req, res, user, 200);
      })
      .catch(error =>  {
        next(response.error(req, res, error, 400));
      })
  }
);

/**
 * Ruta encargada de agregar usuario
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validationHandler(createUserSchema, 'body'),
  (req, res, next) => {
    Controller.insert(req.body).
      then( user => {
        response.success(req, res, user, 201);
      })
      .catch (error => {
        next(response.error(req, res, error, 400));
      })
  }
);

/**
 * Ruta encargada de modificar usuario especifico
 */
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  // validationHandler(updateUserSchema, 'params'),
  (req, res, next)=> {
    // console.log('Params: ',req.params);
    // console.log('Body: ', req.body);
    // const { id } = req.params;
    Controller.update(req.body, req.params).
      then( user => {
        response.success(req, res, user, 201);
      })
      . catch(error => {
        next(response.error(req, res, error, 400));
      })
  }
);


/**
 * Ruta encargada de eliminar usuario
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Controller.drop(req.params)
      .then( user => {
        response.success(req, res, user, 200);
      })
      .catch (error=> {
        next(response.error(req, res, error, 400));
      })
  }
);

module.exports = router;
