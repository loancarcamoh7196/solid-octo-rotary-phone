/**
 * * Controlador / Service de Autenticación
 */
const bcrypt = require('bcrypt');
const auth = require('@auth');
const passport = require('passport');
const user = require('../user');

//Datos Especificos de BD
const DB_NAME = 'empresas_';
const TABLA = 'usr_';

module.exports = function (injectedStore) {
	let store = injectedStore;

	// En caso de no tener acceso de a datos lo invoca
	if (!store)  store = require('@store/dummy');
	
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

				if (!qry) {
					throw boom.badRequest();
				} 

				return userSigned; // Retorna info de usuario, token login, refresh token

			} else new Error ('Credenciales son invalidas.')

			
		} catch (error) {
			throw new Error('Informacion invalida');
		}
	
	};	



	

	async function updateToken(data) {
		return await store.update(DB_NAME,TABLA, data, {id: data.id});
	}

	return {
		login,
		updateToken,
	};
};
