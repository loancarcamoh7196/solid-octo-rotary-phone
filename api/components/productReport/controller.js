/**
 * * Controlador / service  de User ~ Usuario
 */
const bcrypt = require('bcrypt');
const auth = require('../auth');

//Datos Especificos de BD
let DB_NAME = '';
const TABLA = 'v_productos_informe';

const productTable = 'mae_productos';
const priceTable = 'com_precios';

const productController = require('@components/products');
const priceController = require('@components/prices');

//InjectedStore se encuentra declarada en index.js de la carpeta
module.exports = (injectedStore) => {
	let store = injectedStore; // Utilizamos store declara en el index de la carpeta

	const list = (params, db) => {
		DB_NAME = db;	
		return store.list(DB_NAME, TABLA);
	};

	const get = (db, body, params) => {
		DB_NAME = db;
		return store.get(DB_NAME, TABLA, params);
	};

	const update = async(db, body, params) => {
		DB_NAME = db;
		// console.log('Body HTTP: ', body);

		const { nombre, barra, listaId, listaNombre, productoId, precioId, precio, precioPublico, precioIva} = body;

		//Modificar campos Producto
		let productBody = { pdt_nombre: nombre, pdt_barra: barra };
		const productParams = { pdt_index: params.producto_id };
		const resProduct = await store.update(DB_NAME, productTable, productBody, productParams);

		//Modificar campos de Precios
		let priceBody = {
			com_lista: listaId,
			com_item: productoId,
			com_precio: precio,
			com_precio_publico: precioPublico,
			com_precio_iva: precioIva
		}
		const priceParams = { com_index: precioId };
		const resPrice = await store.update(DB_NAME, priceTable, priceBody, priceParams);
		
		// console.log(resPrice);

		return {resProduct, resPrice};
	};

	const insert = async (bd, body) => {
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

	const drop = (bd, id) => {
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
