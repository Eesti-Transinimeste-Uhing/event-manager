import { ReadStream } from 'fs'
import { ReadableStream } from 'stream/web'

const readableStreamToBuffer = async (stream: ReadableStream) => {
  const chunks: Buffer[] = []

  for await (let chunk of stream) {
    chunks.push(chunk)
  }

  return Buffer.concat(chunks)
}

export const streamToBuffer = (stream: ReadStream | ReadableStream): Promise<Buffer> => {
  if (!(stream instanceof ReadStream)) {
    return readableStreamToBuffer(stream)
  }

  return new Promise((resolve, reject) => {
    const buffers: Buffer[] = []

    stream.on('data', (chunk) => {
      buffers.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
    })

    stream.on('end', () => resolve(Buffer.concat(buffers)))

    stream.on('error', (error) => reject(error))
  })
}
