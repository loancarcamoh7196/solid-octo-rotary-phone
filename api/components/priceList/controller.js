/**
 * * Controlador / service  de User ~ Usuario
 */
const bcrypt = require('bcrypt');
const auth = require('../auth');

//Datos Especificos de BD
let DB_NAME = '';
const TABLA = 'mae_precios';

//InjectedStore se encuentra declarada en index.js de la carpeta
module.exports = (injectedStore) => {
	let store = injectedStore; // Utilizamos store declara en el index de la carpeta

	const list = (db) => {
		DB_NAME = db;
		return store.list(DB_NAME, TABLA);
	};

	const get = (db, params) => {
		DB_NAME = db;
		return store.get(DB_NAME, TABLA, params);
	};

	const update = (db, body, params) => {
		DB_NAME = db;

		const user = {
			pre_index: body.id,
			pre_nombre: body.nombre,
			pre_descripcion: body.descripcion,
			pre_porcentaje: body.porcentaje,
			pre_redondeo: body.redondeo,
		};

		return store.update(DB_NAME, TABLA, user, params);
	};

	const insert = async (db, body) => {
		DB_NAME = db;
		// Descontrucción de cuerpo de petición HTTP
		const user = {
			rut: body.rut,
			razon: body.razon,
			bd_nombre: body.bdNombre,
			uri: body.uri,
		};

		return store.insert(DB_NAME, TABLA, user);
	};

	const drop = (db, id) => {
		DB_NAME = db;
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
