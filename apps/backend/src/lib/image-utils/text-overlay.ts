import sharp from 'sharp'
import { TextgenOptions, textGen } from './text-gen'

export const textOverlay = async (input: Buffer, texts: TextgenOptions[]) => {
  const composites: sharp.OverlayOptions[] = [{ input }]

  for (const text of texts) {
    composites.push({ input: await textGen(text).toBuffer() })
  }

  return sharp().composite(composites)
}
