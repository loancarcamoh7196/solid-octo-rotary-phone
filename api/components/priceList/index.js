/**
 * * Handler de Mantenedor Lista de Precios
 * ! NO TOCAR
 */
const store = require('@store/mysql');
const ctrl = require('./controller');

module.exports = ctrl(store);
