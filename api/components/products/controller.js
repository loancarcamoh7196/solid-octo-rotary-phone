/**
 * * Controlador / service de Products - Producto
 */
const bcrypt = require('bcrypt');
const auth = require('../auth');

//Datos Especificos de BD
let DB_NAME = '';
const TABLA = 'mae_productos';

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

		const products = {
			pdt_nombre: body.nombre,
			// pdt_codigo: body.codigo,
			pdt_barra: body.barra,
		};

		return store.update(DB_NAME, TABLA, products, params);
	};

	const insert = async (db, body) => {
		DB_NAME = db;

		// Descontrucción de cuerpo de petición HTTP
		const products = {
			pdt_nombre: body.nombre,
			// pdt_codigo: body.codigo,
			pdt_barra: body.barra,
		};

		return store.insert(DB_NAME, TABLA, products);
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
