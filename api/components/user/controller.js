/**
 * * Controlador / service  de User ~ Usuario
 */
const bcrypt = require('bcrypt');
// const auth = require('../auth');	

//Datos Especificos de BD
const DB_NAME = 'empresas_';
const TABLA = 'usr_';

//InjectedStore se encuentra declarada en index.js de la carpeta
module.exports = (injectedStore) => {
	let store = injectedStore;// Utilizamos store declara en el index de la carpeta
	// if (!store)  store = require('@store/dummy');
	
	const list = () => {
		console.log('Paso por lista de usuarios');
		return store.list(DB_NAME, TABLA);
	}

	//Obtiene listado por id de 	
	const get = (params) => {
		// const { id } = params;
		
		return store.get(DB_NAME, TABLA, params);
	}

	const update = (body, id) => {
		const user = {
			emp_rut: body.emp_rut,
			username: body.username,
			password: body.password,
			token: body.token,
			email: body.email
		};

		return store.update(DB_NAME, TABLA, user, id);
	}

	const insert = async(body) => {
		let passHashed = await bcrypt.hash(body.password, 10);
		
		// Descontrucción de cuerpo de petición HTTP
		const user = {
			emp_rut: body.empRut,
			username: body.username,
			password: passHashed,
			token: body.token,
			email: body.email,
		};
		
		return store.insert(DB_NAME, TABLA, user);
	}

	const drop = ( id ) =>{
		return store.drop(DB_NAME, TABLA, id)
	}

	return {
		list,
		get,
		update,
		insert,
		drop
	};
};