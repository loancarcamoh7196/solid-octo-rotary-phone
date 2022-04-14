/**
 * * Utils encargado del manejo de Tokens
 */
const jwt = require('jsonwebtoken');
const error = require('@utils/error');
const { config } = require('@config');

const secret = config.jwt.token;
// console.log('Secret: ', secret);

function sign(data) {
	return jwt.sign(data, secret);
}

function verify(token) {
	return jwt.verify(token, secret);
}

const check = {
	own: function (req, owner) {
		const decoded = decodeHeader(req);
		console.log(decoded);

		if (decoded.id !== owner)  throw error('No esta autorizado ha hacer esto', 401);
	},
};

const getToken = (auth)=> {
	if (!auth)  throw error('No viene token', 400);
	if (auth.indexOf('Bearer ') === -1)  throw error('Formato invalido', 401);
	
	let token = auth.replace('Bearer ', '');
	return token;
}

const decodeHeader = (req)=> {
	const authorization = req.headers.authorization || '';
	const token = getToken(authorization);
	const decoded = verify(token);

	req.user = decoded;
	return decoded;
}

module.exports = {
	sign,
	check
};
