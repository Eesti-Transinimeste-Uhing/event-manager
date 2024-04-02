import { ReadStream } from 'node:fs'
import stream from 'node:stream/promises'

import { Storage } from '../lib/storage'

import * as imageUtils from '../lib/image-toolkit'
import { downloadPicsumImage } from '../lib/picsum'
import { ReadableStream } from 'stream/web'

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

  public override put = async (templateId: string, banner: ReadStream | ReadableStream) => {
    const writeStream = await this.createWriteStream(templateId)
    const jpegStream = imageUtils.toJpeg()

    await stream.pipeline(banner, jpegStream, writeStream)
  }

  public override delete = async (templateId: string) => {
    await this.deleteFile(templateId)
  }
}
