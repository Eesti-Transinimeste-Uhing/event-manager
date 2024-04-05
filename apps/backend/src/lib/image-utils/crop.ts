import sharp from 'sharp'

export const crop = (options: { height: number; width: number; top: number }) => {
  return sharp()
    .extract({
      left: 0,
      ...options,
    })
    .png()
}
