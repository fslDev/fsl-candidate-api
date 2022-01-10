const fastify = require('fastify')({ logger: true })

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      name: { type: 'string' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  preHandler: async (request, reply) => {},
  handler: async (request, reply) => {
    return { hello: 'world' }
  },
})

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 8080)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
