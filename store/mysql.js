/**
 * * Archivo de Configuración de Conexión a BD
 * ? Contiene métodos para realizar consultas
 * ? Estructura básica de las f(x) 
 * ?	(db, table, data, params)
 */
const mysql = require('mysql');

const { config } = require('@config');
const empresas = require('@config/companies.js');
const { NULL } = require('mysql/lib/protocol/constants/types');
let poolConnection = [];

// Conexión por defecto - a empresas_ BD Auth
const dbconf = {
	host: config.mysql.host,
	user: config.mysql.user,
	port: config.mysql.port,
	password: config.mysql.password,
	database: 'empresas_',
};

let connection; // <-Variable encargada de conexión

function handleCon() {
	connection = mysql.createConnection(dbconf);

	connection.connect((err) => {
		if (err) {
			console.error('[db err]', err);
			setTimeout(handleCon, 2000);
		} else {
			console.log('	BD Conecteda! ');
		}
	});

	connection.on('error', (err) => {
		console.error('[db err]', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleCon();
		} else {
			throw err;
		}
	});
}

handleCon();


const sanearParams= (params) =>{
	let qry = '';
	let lengthParams = Object.keys(params).length;
	let count = 1;

	console.log('Largo de Params: ', lengthParams);
	console.log('Params: ', params);

	if (lengthParams > 1) {
		console.log('Tiene varios parametros');
		// Object.entries(params).forEach((key, value) => {
		// 	qry = qry + key + '=' + value + ' AND ';
		// })

		for (const [key, value] of Object.entries(params)) {
			// console.log(value);
			qry = qry + `${key}=${value} `;
			if (count < lengthParams) {
				qry = qry + ' AND ';
			}
			count++;
		}
	}

	return qry;
}

/**
 * Funcion que retorna Lista de Registros
 * @param {string} db Nombre de la BD que desea consultar
 * @param {string} table Nombre de la tabla que desea manejar
 * @returns lista de todos los registros 
 */
const list = (db, table)=> {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${db}.${table}`, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
	connection.end();
}

/**
 ** Lista de elementos filtradas por parametro
 * @param {string} db Nombre de BD
 * @param {string} table nombre de la tabla
 * @param {element} params lista de parametros, con que se filtra lista
 * @returns 
 */
const get = (db, table, params) => {
	// console.log(data);
	// console.log(params);
	qry = sanearParams(params);

	console.log(typeof(qry))

	if(qry == '') {
		// console.log('Pso por aqui')
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${db}.${table} WHERE  ?`, params, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
	}else {
		console.log(qry);

		return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${db}.${table} WHERE  ${qry}`, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
	}
	
	connection.end();
};

/**
 ** Función que inserta (de a un elemento) en tabla especificada  
 * @param {string} db Nombre de BD
 * @param {string} table Nombre de la tabla
 * @param {element} data Campos con data que se desea insertar
 * @returns estado de inserción
 */
const insert = (db, table, data)=> {
	return new Promise((resolve, reject) => {
		connection.query(`INSERT INTO ${db}.${table} SET ?`, data, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});

	connection.end();
}

/**
 ** Función que actuliza un registro especificado
 * @param {string} db Nombre de la Base de Datos
 * @param {string} table Nombre de la tabla que se desea actualizar
 * @param {element} data Campos con data que se desea cambiar
 * @param {element} params Parametros por los que se filtrara actualización
 * @returns estado de actualizaicón
 */
const update = (db, table, data, params)=> {
	return new Promise((resolve, reject) => {

		// console.log(data);
		// console.log(params);

		connection.query(
			`UPDATE ${db}.${table} SET ? WHERE ?`, [data, params], (err, result) => {
				if (err) return reject(err);
				// console.log(err);
				resolve(result);
			}
		);
	});

	connection.end();
}


const query = (db, table, query) => {
	return new Promise((resolve, reject) => {

		connection.query(`SELECT * FROM ${db}.${table} WHERE ?`, query, (err, res) => {
			if (err) return reject(err);
			resolve(res[0] || null);
		})
	});

	connection.end();
}

/**
 ** Elimina registro especifico
 * @param {string} db Nombre de la BD
 * @param {string} table Nombre de la tabla
 * @param {element} params Parametros con los cuales se hara el filtro de eliminación
 * @returns 
 */
const drop = (db, table, params) => {
	return new Promise((resolve, reject) => {
		connection.query(`DELETE FROM ${db}.${table} WHERE  ?`, params, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
	connection.end();
}


module.exports = {
	list,
	get,
	update,
	insert,
	query,
	drop
};
