import { ReadStream, read } from 'node:fs'
import stream, { pipeline } from 'node:stream/promises'

import { Storage } from '../lib/storage'

import * as imageUtils from '../lib/image-toolkit'
import { downloadPicsumImage } from '../lib/picsum'
import { ReadableStream } from 'stream/web'
import { templateController } from '../server/static-context'
import { crop } from '../lib/image-utils'
import probe from 'probe-image-size'

export class TemplateBannersStorage extends Storage {
  constructor() {
    super('template-banners')
  }

  public override exists = (id: string) => {
    return this.existsFile(id)
  }

  public override get = async (templateId: string) => {
    if (!(await this.existsFile(templateId))) {
      const blob = await downloadPicsumImage(templateId, 1920, 1080)
      await this.putFile(templateId, blob.stream())
    }

    return await this.getFile(templateId)
  }

  public cropAndGet = async (templateId: string) => {
    const readStream = await this.get(templateId)
    const template = await templateController.getById(templateId)

    if (!template || !readStream) {
      return null
    }

    // const size = await probe(readStream)

    // console.log('OFFSET:', size)

    const dragOffset = template.bannerOffset
    // const size = [1920, 1080]
    // const aspectRatio = 1920 / 1440
    // const dragSpeed = 250

    // const top = Math.floor(aspectRatio / dragOffset + aspectRatio * dragSpeed)

    // console.log({ aspectRatio })

    return readStream.pipe(
      crop({
        width: 1920,
        height: 1080,
        top: dragOffset * -1,
      }).jpeg()
    )
  }

  public override put = async (templateId: string, banner: ReadStream | ReadableStream) => {
    const writeStream = await this.createWriteStream(templateId)
    const jpegStream = imageUtils.toJpeg()

    await stream.pipeline(banner, jpegStream, writeStream)
  }

  public override delete = async (templateId: string) => {
    await this.deleteFile(templateId)
  }
}
