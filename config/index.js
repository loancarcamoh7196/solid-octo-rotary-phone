/**
 * Archivo de Manejo de Variables de entorno
 */
require('dotenv').config();

const config = {
	api: {
		env: process.env.ENV || 'development',
		port: process.env.API_PORT || 3030,
		isProd: process.env.ENV === 'production',
		key: process.env.API_KEY,
	},
	jwt: {
		token: process.env.JWT_TOKEN || 'endif.5283',
		refresh: process.env.REFRESH_TOKEN,
		recovery: process.env.RECOVERY_TOKEN,
	},
	mysql: {
		host: process.env.DB_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		port: process.env.MYSQL_PORT,
	},
};


module.exports = { config } ;