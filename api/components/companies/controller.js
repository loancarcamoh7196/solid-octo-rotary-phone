/**
 * * Controlador / service  de User ~ Usuario
 */
const bcrypt = require('bcrypt');
const auth = require('../auth');

//Datos Especificos de BD
const DB_NAME = 'empresas_';
const TABLA = 'emp_';

//InjectedStore se encuentra declarada en index.js de la carpeta
module.exports = (injectedStore) => {
	let store = injectedStore; // Utilizamos store declara en el index de la carpeta

	const list = () => {
		return store.list(DB_NAME, TABLA);
	};

	const get = (params) => {
		return store.get(DB_NAME, TABLA, params);
	};

	const update = (body, params) => {
		const user = {
			razon: body.razon,
			bd_nombre: body.bdNombre,
			uri: body.uri
		};

		return store.update(DB_NAME, TABLA, user, params);
	};

	const insert = async (body) => {

		// Descontrucción de cuerpo de petición HTTP
		const user = {
			rut: body.rut,
			razon: body.razon,
			bd_nombre: body.bdNombre,
			uri: body.uri,
		};

		return store.insert(DB_NAME, TABLA, user);
	};

	const drop = (id) => {
		return store.drop(DB_NAME, TABLA, id);
	};

	return {
		list,
		get,
		update,
		insert,
		drop,
	};
};
