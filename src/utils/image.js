import sharp from 'sharp'

export async function process(originPath, thumbPath, options) {
  try {
    const { flip, flop } = options
    await sharp(originPath).flip(flip).flop(flop).toFile(thumbPath)
    return thumbPath
  } catch {
    throw new Error('image-could-not-be-processed')
  }
}
