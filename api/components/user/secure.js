/**
 ** Archivo de confih¿guración de Acceso a Acciones
 */
const auth = require('@auth');

module.exports = function checkAuth(action) {
	function middleware(req, res, next) {
		switch (action) {
			case 'update':
				const owner = req.body.id;
				auth.check.own(req, owner);
				break;

			case 'add':
				auth.check.logged(req);
				next();
				break;

			default:
				next();
		}
	}

	return middleware;
};
