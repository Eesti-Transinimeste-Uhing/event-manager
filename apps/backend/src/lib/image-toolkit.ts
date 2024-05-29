import sharp from 'sharp'

export const toJpeg = (input?: Buffer) => {
  return sharp(input)
    .resize({
      withoutEnlargement: true,
      width: 1920,
    })
    .jpeg({ mozjpeg: true, progressive: true, quality: 80 })
}
