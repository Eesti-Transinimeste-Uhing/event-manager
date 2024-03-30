import fetch from 'node-fetch-retry'

export const downloadPicsumImage = async (
  seed: string,
  width: string | number,
  height: string | number
): Promise<Blob> => {
  const resp = await fetch(`https://picsum.photos/seed/${seed}/${width}/${height}`, {
    retry: 3,
    pause: 1000,
    silent: true,
  })

  return resp.blob()
}
