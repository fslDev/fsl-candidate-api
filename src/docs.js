export const docs = {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Fitshipper API',
      version: '0.1.0',
    },
    host: 'localhost:8080',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: ['Address'],
    definitions: {},
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
  },
  exposeRoute: true,
}
