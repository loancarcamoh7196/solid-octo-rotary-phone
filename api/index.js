/**
 ** Archivo Principal de la API
 */
const  express = require('express');
require('module-alias/register');

const  bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const { config } = require('@config');
const errors = require('@network/error')
const user = require('@components/user/network');
const auth = require('@components/auth/network');
const swaggerDoc = require('@api/swagger.json');

const  app = express();

app.use(bodyParser.json());


// Declaraación de Rutas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/user', user);
app.use('/api/auth', auth);

app.use(errors); //Handler Error

//Lanzar API
app.listen(config.api.port, () => {
  console.log('API escuchando en el puerto ', config.api.port);
});