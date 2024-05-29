import stream from 'node:stream/promises'

import { Storage } from '../lib/storage'

import { downloadPicsumImage } from '../lib/picsum'
import { config } from '../config'
import sharp from 'sharp'
import { AppDataSource } from '../data-source'
import { Template } from '../entity/template'

export class TemplateBannersStorage extends Storage {
  private manager = AppDataSource.createEntityManager()

  constructor() {
    super('template-banners')
  }

  public override exists = async (id: string) => {
    return this.existsFile(id)
  }

  public override get = async (templateId: string) => {
    const template = await this.manager.findOneByOrFail(Template, {
      id: templateId,
    })

    let buffer: Buffer | null = Buffer.from([])

    if (
      config.server.storageCache.includes(this.directory) &&
      (await this.existsFile(templateId))
    ) {
      buffer = await this.getFile(templateId)

      if (!buffer) return null
    } else {
      buffer = await downloadPicsumImage(templateId, 1920, 1280)

      if (!buffer) return null

      await this.put(templateId, buffer)
    }

    const pipeline = sharp(buffer).extract({
      width: 1920,
      height: 1080,
      left: 0,
      top: template.bannerOffset * -1,
    })

    return await pipeline.toBuffer()
  }

  public override put = async (templateId: string, banner: Buffer) => {
    const writeStream = await this.createWriteStream(templateId)

    const pipeline = sharp(banner)
      .resize({
        width: 1920,
        withoutReduction: true,
      })
      .resize({
        height: 1080,
        withoutReduction: true,
      })

    await stream.pipeline(pipeline, writeStream)
  }

  public override delete = async (templateId: string) => {
    await this.deleteFile(templateId)
  }
}
