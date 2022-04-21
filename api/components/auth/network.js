/**
 * * Archivo de rutas de modulo Auth
 * ? URI: /api/v1/auth
 */
const express = require('express');

const response = require('@network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', function (req, res, next) {
	Controller.login(req.body.username, req.body.password)
		.then((token) => {
			response.success(req, res, token, 200);
		})
		.catch(next);
});

module.exports = router;
