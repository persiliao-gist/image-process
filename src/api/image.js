import Fastify from 'fastify'
import { imageValidate } from '../validate/imageProcess.js'
import { downloadFile } from '../utils/http.js'
import { process } from '../utils/image.js'

export function build(options = { logger: true }) {
  const fastify = Fastify(options)
  fastify.post('/process', { schema: { body: imageValidate } }, (request, reply) => {
    //  Temporary directory the path, just to demo doing so
    const temporaryDirectory = './images'
    downloadFile(request.body.url, temporaryDirectory, request.body.downloadFileName).then(response => {
      process([temporaryDirectory, request.body.downloadFileName].join('/'), [temporaryDirectory, request.body.thumbFileName].join('/'), {
        flip: !!request.body.flip,
        flop: !!request.body.flop
      }).then(() => {
        reply.send({ message: 'Image flipped successfully' })
      }).catch(reason => {
        reply.code(400).send({ message: 'Image processing failed', reason: reason })
      })
    }).catch(reason => {
      reply.code(400).send({ message: 'Please enter correct image url', reason: reason })
    })
  })
  return fastify
}
