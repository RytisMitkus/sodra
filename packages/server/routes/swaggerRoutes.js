const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Unicorns news backend',
            description: `Documentation of Unicorns news backend endpoints: response codes, input parameters, etc. 
				Please check if the endpoint does not require to be authenticated.`,
            contact: { name: 'rytis@mitkus.lt' },
            servers: [{ url: 'http://localhost:3000' }],
        },
    },
    apis: [
        // './docs/**/**.js',
        // './docs/**/**.yaml',
        './routes/*Routes*.js',
    ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
module.exports = router;