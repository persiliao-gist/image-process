import { test } from 'tap'
import { build } from '../src/api/image.js'

test('requests the "/process" route body empty', async t => {
  const app = build({ logger: false })

  const response = await app.inject({
    method: 'POST',
    url: '/process'
  })
  t.equal(response.statusCode, 400, 'body must be object')
})

test('requests the "/process" route body url empty', async t => {
  const app = build({ logger: false })

  const response = await app.inject({
    method: 'POST',
    url: '/process',
    body: {
      url: ''
    }
  })
  t.equal(response.statusCode, 400, 'body url must be string')
  t.equal(response.json().message, 'Please enter correct image url', 'Please enter correct image url')
})

test('requests the "/process" route', async t => {
  const app = build({ logger: false })

  const response = await app.inject({
    method: 'POST',
    url: '/process',
    body: {
      url: 'https://avatars.githubusercontent.com/u/19988497',
      flip: true,
      downloadFileName: 'origin.png',
      thumbFileName: 'flip_thumb.png',
    }
  })
  t.equal(response.statusCode, 200, 'flip response status code is ok')
})

test('requests the "/process" route', async t => {
  const app = build({ logger: false })

  const response = await app.inject({
    method: 'POST',
    url: '/process',
    body: {
      url: 'https://avatars.githubusercontent.com/u/19988497',
      flop: true,
      downloadFileName: 'origin.png',
      thumbFileName: 'flop_thumb.png',
    }
  })
  t.equal(response.statusCode, 200, 'flop response status code is ok')
})
