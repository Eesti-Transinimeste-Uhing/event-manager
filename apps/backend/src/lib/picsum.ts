export const downloadPicsumImage = async (
  seed: string,
  width: string | number,
  height: string | number
): Promise<Blob> => {
  const resp = await fetch(`https://picsum.photos/seed/${seed}/${width}/${height}`)

  return resp.blob()
}
