import * as uuid from 'uuid'
import Fastify from 'fastify'
import FastifySwagger from 'fastify-swagger'
import httpErrors from 'http-errors'

const { NotFound } = httpErrors

import { docs } from './docs.js'

const app = Fastify({ logger: true })

// In-memory database
const db = {
  address: [],
}

app.get('/', async (req) => ({
  live: true,
  message: 'Check /documentation for more information!',
}))

app.register(FastifySwagger, docs)

app.addSchema({
  $id: 'Address',
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    address1: { type: 'string' },
    address2: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zip: { type: 'string' },
  },
  required: ['id', 'name', 'address1', 'city', 'state', 'zip'],
})

app.route({
  method: 'POST',
  url: '/v1/address',
  schema: {
    tags: ['Address'],
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
    const id = db.address.length
    const data = { ...req.body, id, fromIp: req.ip }

    db.address.push(data)

    return data
  },
})

app.route({
  method: 'GET',
  url: '/v1/address/:id',
  schema: { tags: ['Address'], response: { 200: { $ref: 'Address#' } } },
  handler: async (req) => {
    const saved = db.address[req.params.id]

    if (!saved) throw new NotFound('Address not found')

    return saved
  },
})

app.route({
  method: 'GET',
  url: '/v1/address',
  schema: {
    tags: ['Address'],
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

app.route({
  method: 'PATCH',
  url: '/v1/address/:id',
  schema: {
    tags: ['Address'],
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        address1: { type: 'string' },
        address2: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zip: { type: 'string' },
      },
    },
    response: { 200: { $ref: 'Address#' } },
  },
  handler: async (req) => {
    const id = req.params.id
    const saved = db.address[id]

    if (!saved) throw new NotFound('Address not found')

    const data = { ...saved, ...req.body, id }

    db.address[id] = data

    return db.address[id]
  },
})

app.route({
  schema: { tags: ['Address'] },
  method: 'DELETE',
  url: '/v1/address/:id',
  handler: async (req) => {
    const id = Number(req.params.id)

    db.address = [...db.address.filter((a) => a.id !== id)]

    return {}
  },
})

const start = async () => {
  try {
    await app.listen(process.env.PORT || 8080, '0.0.0.0')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
