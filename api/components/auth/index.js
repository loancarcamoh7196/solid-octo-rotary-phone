/**
 * * Manejador de Mantenedor de Authencation
 * ! NO TOCAR
 */
const store = require('@store/mysql');
const ctrl = require('./controller');

module.exports = ctrl(store);
