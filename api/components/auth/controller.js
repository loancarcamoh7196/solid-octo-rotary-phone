/**
 * * Controlador / Service de Autenticación
 * 
 */

const bcrypt = require('bcrypt');
const auth = require('@auth');

// Nombre de la Tabla
const TABLA = 'auth';

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
			const data = await store.query(TABLA, { username: username });

		return bcrypt
			.compare(password, data.password)
			.then((sonIguales) => {
				if (sonIguales) {
					// Generar token;
					return auth.sign(data);
				} else {
					throw new Error('Informacion invalida');
				}
			});
		} catch (error) {
			throw new Error('Informacion invalida');
		}
	
	};	

	async function upsert(data) {
		const authData = {
			id: data.id,
		};

		if (data.username)  authData.username = data.username;
		if (data.password) authData.password = await bcrypt.hash(data.password, 5);
		

		return store.upsert(TABLA, authData);
	}

	return {
		login,
		upsert,
	};
};
