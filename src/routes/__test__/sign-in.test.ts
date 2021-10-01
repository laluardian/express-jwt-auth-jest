import request from 'supertest'
import { app } from '../../app'

it('fails when an email does not exist supplied', async () => {
  await request(app)
    .post('/api/signin')
    .send({
      email: 'test@test.com',
      password: 'password1234'
    })
    .expect(400)
})

it('fails when an incorrect/empty email and password is supplied', async () => {
  await request(app)
    .post('/api/signup')
    .send({
      email: 'test@test.com',
      password: 'password1234'
    })
    .expect(201)

  await request(app)
    .post('/api/signin')
    .send({
      email: 'test123@test.com',
      password: 'incorrectpassword'
    })
    .expect(400)
})

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/signup')
    .send({
      email: 'test@test.com',
      password: 'password1234'
    })
    .expect(201)

  const response = await request(app)
    .post('/api/signin')
    .send({
      email: 'test@test.com',
      password: 'password1234'
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
