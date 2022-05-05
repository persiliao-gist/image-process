import * as fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import Axios from 'axios'

export async function downloadFile(url, dir, name) {
  if (!lodash.startsWith(url, 'https')) {
    throw new Error('Please enter correct image url')
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  const filePath = path.resolve(dir, name)
  const writer = fs.createWriteStream(filePath)
  // The axios module can then be packaged independently
  // can add request Interceptor, response Interceptor in axios for request, response unified processing, here is just a simple call
  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })
  response.data.pipe(writer)
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}
