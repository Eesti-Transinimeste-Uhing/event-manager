import sharp from 'sharp'

export const toJpeg = () => {
  return sharp()
    .resize({ withoutEnlargement: true, width: 1920 })
    .jpeg({ mozjpeg: true, progressive: true, quality: 80 })
}
