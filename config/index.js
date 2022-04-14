/**
 * Archivo de Manejo de Variables de entorno
 */
require('dotenv').config();

const config = {
	api: {
		env: process.env.ENV || 'development',
		port: process.env.API_PORT || 3030,
		key: process.env.API_KEY,
	},
	jwt:{
		token: process.env.JWT_TOKEN || 'endif.5283',
	}
};


module.exports = { config } ;