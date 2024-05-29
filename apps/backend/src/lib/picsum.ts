import fetch from 'node-fetch-retry'
import { streamToBuffer } from './stream-to-buffer'

export const downloadPicsumImage = async (
  seed: string,
  width: string | number,
  height: string | number
): Promise<Buffer> => {
  const resp = await fetch(`https://picsum.photos/seed/${seed}/${width}/${height}`, {
    retry: 3,
    pause: 1000,
    silent: true,
  })

  const blob: Blob = await resp.blob()

  return await streamToBuffer(blob.stream())
}
