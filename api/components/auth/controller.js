/**
 * * Controlador / Service de Autenticación
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('@auth');
const { config } = require('@config');
const user = require('../user');

//Datos Especificos de BD
const DB_NAME = 'empresas_';
const TABLA = 'usr_';
const COMPANY_TABLE = 'emp_';

module.exports = function (injectedStore) {
	let store = injectedStore;
	
	/**
	 * Comprueba si los datos de autentificacion son correctos. De serlo retorna token firmado
	 * @param {string} username 
	 * @param {string} password 
	 * @returns token firmado
	 */
	const login = async (username, password) => {
		try {
			const data = await store.query(DB_NAME, TABLA, { username: username });
			// console.log(data);
			const isMatch = await bcrypt.compare(password, data.password); 

			if(isMatch){
				const userSigned = auth.sign(data);
				userSigned.user.token = userSigned.refreshToken;
				// console.log(userSigned);
				const qry = updateToken({ ...data, token: userSigned.refreshToken }); // Actualizar token dentro de BD
				if (!qry)  throw boom.badRequest();
				// console.log(data.id)
				const empresa = await store.query(DB_NAME, COMPANY_TABLE, {rut: data.id});
				// console.log(empresa.bd_nombre);
				userSigned.user.bd_nombre = empresa.bd_nombre;
				return userSigned; // Retorna info de usuario, token login, refresh token

			} else new Error ('Credenciales son invalidas.');
		} catch (error) {
			throw new Error('Informacion invalida');
		}
	};	

	const refresh = async(data) =>{
		console.log('Paso por refresh')
		// console.log(data);
		const  token = sanearTokenAuthBear(data.headers.authorization);

		let isCorrect = jwt.verify(token, config.jwt.refresh, {ignoreExpiration: true} );
		// console.log('Es correcto: ', isCorrect)
		if (!isCorrect) throw new Error('Acceso denegado');
		const user = findUser({ id: isCorrect.sub });
		if (!user) throw new Error('No hay info');

		const payload = { sub: isCorrect.sub };
		const refreshToken = jwt.sign(payload, config.jwt.refresh, {
			expiresIn: '30m',
		});

		// console.log('ID user:', isCorrect.sub);
		const res = updateToken({ token: refreshToken , id: isCorrect.sub } );
		console.log(refreshToken)
		return refreshToken;
	}	

	async function updateToken(data) {
		return await store.update(DB_NAME,TABLA, data, {id: data.id});
	}

	async function findUser(data) {
		return await store.get(DB_NAME, TABLA, data)
	}

	const sanearTokenAuthBear = (token) => {
		token = token.replace('Bearer', '');
		token = token.replace(' ', '');
		token = token.replace(';', '');
		// console.log('Token Refresh: ', token);
		return token;
	}

	return {
		login,
		refresh,
		updateToken,
	};
};
