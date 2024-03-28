import fs, { ReadStream } from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import stream from 'node:stream/promises'

import { config } from '../config'
import * as imageUtils from '../lib/image-toolkit'

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
      return null
    }

    return await fsp.readFile(TemplateBannersStorage.getPath(templateId))
  }

  public async put(templateId: string, banner: ReadStream) {
    await this.delete(templateId)

    const writeStream = fs.createWriteStream(TemplateBannersStorage.getPath(templateId))
    const jpegStream = imageUtils.toJpeg()

    await stream.pipeline(banner, jpegStream, writeStream)
  }

  public async delete(templateId: string) {
    await fsp.unlink(TemplateBannersStorage.getPath(templateId))
  }
}
