require('dotenv').config();

const config = {
	api: {
		env: process.env.ENV || 'development',
		port: process.env.API_PORT || 3030
	},
};


module.exports = { config}