import * as swaggerJSDoc from 'swagger-jsdoc';

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "RestFul API with TypeScript, TypeORM (MySql) and Express",
      version: "1.0.0",
      description: "A test project to understand how easy it is to document and Express API",
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      },
      contact: {
        email: "contact@asyncdeveloper.com"
      }
    },
    host: 'localhost:3001',
    basePath: '/api/v1',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        scheme: 'bearer',
        name: 'Authorization',
        bearerFormat: 'JWT',
        description: 'Enter your bearer token in the format **Bearer &lt;token>**'
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [
      {
        url: "http://localhost:3001/api/v1"
      }
    ]
  },
  apis: ['**/*.ts'],
};

const specs = swaggerJSDoc(options);

export default specs
