/**
 * Archivo Controlador de Rutas para usuario
 * ? URI: /api/users
 */
const express = require('express');
const response = require('@network/response');
const Controller = require('./index');

const router = express.Router(); // Manejador de Rutas

// Routas del Mantendor
router.get('/', list)
router.get('/:id', get);
router.post('/', upsert);
router.patch('/', upsert);

//Funcionamiento Interno
function list(req, res, next) {
  Controller.list()
  .then((lista) => {
    response.success(req, res, lista, 200);
  })
  .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
  
}

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
    
}

module.exports = router;
