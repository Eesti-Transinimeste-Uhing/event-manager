import fs, { ReadStream } from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import stream from 'node:stream/promises'

import { config } from '../config'
import * as imageUtils from '../lib/image-toolkit'
import { downloadPicsumImage } from '../lib/picsum'
import { ReadableStream } from 'stream/web'

export class TemplateBannersStorage {
  public static getPath(templateId: string) {
    return path.join(TemplateBannersStorage.path, templateId)
  }

  private static path = path.join(config.mounts.staticFiles, 'template-banners')

  constructor() {
    if (!fs.existsSync(TemplateBannersStorage.path)) {
      fs.mkdirSync(TemplateBannersStorage.path, { recursive: true })
    }
  }

  public async exists(templateId): Promise<boolean> {
    try {
      await fsp.access(TemplateBannersStorage.getPath(templateId), fs.constants.R_OK)
      return true
    } catch {
      return false
    }
  }

  public async get(templateId: string) {
    if (!(await this.exists(templateId))) {
      const blob = await downloadPicsumImage(templateId, 1920, 1080)
      await this.put(templateId, blob.stream())
    }

    return await fsp.readFile(TemplateBannersStorage.getPath(templateId))
  }

  public async put(templateId: string, banner: ReadStream | ReadableStream) {
    await this.delete(templateId)

    const writeStream = fs.createWriteStream(TemplateBannersStorage.getPath(templateId))
    const jpegStream = imageUtils.toJpeg()

    await stream.pipeline(banner, jpegStream, writeStream)
  }

  public async delete(templateId: string) {
    if (!(await this.exists(templateId))) {
      return
    }

    await fsp.unlink(TemplateBannersStorage.getPath(templateId))
  }
}
