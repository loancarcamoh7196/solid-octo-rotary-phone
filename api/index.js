/**
 ** Archivo Principal de Rutas de la API
 *? URI: /
 */
const  express = require('express');
require('module-alias/register');

const  bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const { config } = require('@config');
const errors = require('@network/error');

//Archivos de Rutas de los mantendores y otros
const user = require('@components/user/network');
const auth = require('@components/auth/network');
const companies = require('@components/companies/network');
const products = require('@components/products/network');
const prices = require('@components/prices/network')
const priceList = require('@components/priceList/network');
const productReport = require('@components/productReport/network');

const swaggerDoc = require('@api/swagger.json');

const app = express();

app.use(bodyParser.json());


// Declaración de Rutas
const router = express.Router();
app.use('/api/v1', router); // Ruta de origen
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // Ruta documentacion API
router.use('/user', user);
router.use('/auth', auth);
router.use('/companies', companies);
router.use('/products', products);
router.use('/prices', prices);
router.use('/pricelist', priceList);
router.use('/product_report', productReport);



app.use(errors); //Handler Error

//Lanzar API
app.listen(config.api.port, () => {
  console.log('API escuchando en el puerto ', config.api.port);
});