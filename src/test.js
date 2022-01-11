import axios from 'axios'
import assert from 'assert'

const request = axios.create({
  baseURL: 'http://localhost:8080',
})

async function test() {
  const address = {
    name: 'My Address',
    address1: '123 Main St',
    address2: '',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  }

  // Post
  const postRes = await request.post('/v1/address', address)

  const { id, ...data } = postRes.data

  assert.deepEqual(data, address)
  assert.ok(id)

  // Get
  const getRes = await request.get('/v1/address')
  const len1 = Number(getRes.data.length)

  assert.ok(getRes.data.length)

  // Patch
  const patchRes = await request.patch(`/v1/address/${id}`, {
    name: 'New Name',
  })

  assert.deepEqual(patchRes.data, { id, ...data, name: 'New Name' })

  // Del
  await request.delete(`/v1/address/${id}`)

  const getRes2 = await request.get('/v1/address')

  assert.deepEqual(getRes2.data.length, len1)
}

test()
