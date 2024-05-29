import stream from 'node:stream/promises'
import sharp from 'sharp'

import { Storage } from '../lib/storage'

import * as imageUtils from '../lib/image-toolkit'
import { TemplateBannersStorage } from './template-banners'
import { AppDataSource } from '../data-source'
import { Form } from '../entity/form'
import { textGen } from '../lib/image-utils'
import { config } from '../config'
import { DateTime } from 'luxon'

export class FormBannersStorage extends Storage {
  private templateBanners = new TemplateBannersStorage()

  private manager = AppDataSource.createEntityManager()

  constructor() {
    super('form-banners')
  }

  public override exists = async (id: string) => {
    return this.existsFile(id)
  }

  public override get = async (formId: string) => {
    const form = await this.manager.findOneByOrFail(Form, {
      id: formId,
    })

    let buffer: Buffer | null = Buffer.from([])

    if (config.server.storageCache.includes(this.directory) && (await this.existsFile(formId))) {
      buffer = await this.getFile(formId)

      if (!buffer) return null
    } else {
      const template = await form.template
      buffer = await this.templateBanners.get(template.id)

      if (!buffer) return null

      await this.put(formId, buffer)
    }

    const pipeline = sharp(buffer).composite([
      {
        input: await textGen({
          font: {
            colour: '#222',
            size: 60,
            family: 'Space Mono',
            weight: 'bold',
          },
          content: form.name.et_EE.toUpperCase(),
          width: 1920,
          height: 1080,
          left: 552,
          top: 130,
          lineWidth: 30,
        }),
      },
      {
        input: await textGen({
          font: {
            colour: '#0DBD7A',
            size: 60,
            family: 'Space Mono',
            weight: 'bold',
          },
          content: form.name.en_GB.toUpperCase(),
          width: 1920,
          height: 1080,
          left: 552,
          top: 300,
          lineWidth: 30,
        }),
      },
      {
        input: await textGen({
          font: {
            colour: 'black',
            size: 132,
            family: 'Space Mono',
            weight: 'normal',
          },
          content: DateTime.fromJSDate(form.startsAt).toFormat('dd.MM'),
          width: 1920,
          height: 1080,
          left: 552,
          top: 500,
          lineWidth: 5,
        }),
      },
      {
        input: await textGen({
          font: {
            colour: '#0DBD7A',
            size: 132,
            family: 'Space Mono',
            weight: 'normal',
          },
          content: DateTime.fromJSDate(form.startsAt).toFormat('HH:mm'),
          width: 1920,
          height: 1080,
          left: 552,
          top: 650,
          lineWidth: 5,
        }),
      },
    ])

    return await pipeline.toBuffer()
  }

  public override put = async (formId: string, banner: Buffer) => {
    const writeStream = await this.createWriteStream(formId)
    const jpegStream = imageUtils.toJpeg(banner)

    await stream.pipeline(jpegStream, writeStream)
  }

  public override delete = async (formId: string) => {
    await this.deleteFile(formId)
  }
}
