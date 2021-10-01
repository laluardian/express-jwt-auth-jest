import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on a successful signup', async () => {
  await request(app)
    .post('/api/signup')
    .send({
      email: 'test@test.com',
      password: 'password1234'
    })
    .expect(201)
})

it('returns a 400 with an invalid/empty email', async () => {
  await request(app)
    .post('/api/signup')
    .send({
      email: 'not an email',
      password: 'password1234'
    })
    .expect(400)
})

it('returns a 400 with an invalid/empty password', async () => {
  await request(app)
    .post('/api/signup')
    .send({
      email: 'test@test.com',
      password: '6chars'
    })
    .expect(400)
})

it('returns a 400 with an invalid/empty email and password', async () => {
  await request(app)
    .post('/api/signup')
    .send({
      email: 'not an email',
      password: '6chars'
    })
    .expect(400)
})

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/signup')
    .send({
      email: 'test@test.com',
      password: 'password1234'
    })
    .expect(201)

  await request(app)
    .post('/api/signup')
    .send({
      email: 'test@test.com',
      password: 'password1234'
    })
    .expect(400)
})

it('sets a cookie after a successful signup', async () => {
  const response = await request(app)
    .post('/api/signup')
    .send({
      email: 'test@test.com',
      password: 'password1234'
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})
