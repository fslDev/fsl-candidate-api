import * as uuid from 'uuid'
import Fastify from 'fastify'
import FastifySwagger from 'fastify-swagger'

import { docs } from './docs.js'

const app = Fastify({ logger: true })

// In-memory database
const db = {
  address: [],
}

app.register(FastifySwagger, docs)
app.addSchema({
  $id: 'Address',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    address1: { type: 'string' },
    address2: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zip: { type: 'string' },
  },
  required: ['id', 'name', 'address1', 'city', 'state', 'zip'],
})

// curl -H 'Content-Type: application/json' -d '{ "name": "test" }' -X POST http://localhost:8080/v1/address
app.route({
  method: 'POST',
  url: '/v1/address',
  schema: {
    body: {
      type: 'object',
      required: ['name', 'address1', 'city', 'state', 'zip'],
      additionalProperties: false,
      properties: {
        name: { type: 'string' },
        address1: { type: 'string' },
        address2: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zip: { type: 'string' },
      },
    },
    response: {
      200: { $ref: 'Address#' },
    },
  },
  handler: async (req) => {
    const data = {
      ...req.body,
      id: uuid.v4(),
      fromIp: req.ip,
    }

    db.address.push(data)

    return data
  },
})

app.route({
  method: 'GET',
  url: '/v1/address',
  schema: {
    querystring: {
      type: 'object',
      properties: { name: { type: 'string' } },
      additionalProperties: false,
    },
    response: { 200: { type: 'array', items: { $ref: 'Address#' } } },
  },
  handler: async (req) => {
    const filter = req.query

    let result = db.address.filter((a) => a.fromIp === req.ip)

    if (filter.name) result = result.filter((a) => a.name.includes(filter.name))

    return result ?? []
  },
})

const start = async () => {
  try {
    await app.listen(process.env.PORT || 8080)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
