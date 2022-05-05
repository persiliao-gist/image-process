// Simple parameter verification
export const imageValidate = {
  type: 'object',
  required: ['url'],
  properties: {
    url: { type: 'string' },
    flip: { type: 'boolean' }, // Flip the image about the vertical Y axis
    flop: { type: 'boolean' }, // Flop the image about the horizontal X axis
    downloadFileName: { type: 'string' }, // Save the path, just to demo doing so
    thumbFileName: { type: 'string' } // Save the path, just to demo doing so
  }
}
