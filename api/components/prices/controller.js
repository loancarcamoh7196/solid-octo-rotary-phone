/**
 * * Controlador / service  de User ~ Usuario
 */
const bcrypt = require('bcrypt');
const auth = require('../auth');

//Datos Especificos de BD
let DB_NAME = '';
const TABLA = 'com_precios';

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

		const price = {
			com_lista: body.listaId,
			com_item: body.productId,
			com_precio: body.precio,
			com_precio_publico: body.precioPublico,
			com_precio_iva: body.precioIva
		};

		return store.update(DB_NAME, TABLA, price, params);
	};

	const insert = async (db, body) => {
		DB_NAME = db;
		
		// Descontrucción de cuerpo de petición HTTP
		const price = {
			com_index: body.id,
			com_lista: body.listaId,
			com_item: body.productId,
			com_precio: body.precio,
			com_precio_publico: body.precioPublico,
			com_precio_iva: body.precioIva,
		};

		return store.insert(DB_NAME, TABLA, price);
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
