import path from 'node:path'
import fs, { ReadStream } from 'node:fs'
import fsp from 'node:fs/promises'
import { ReadableStream } from 'node:stream/web'
import stream from 'node:stream/promises'

import { config } from '../config'

export abstract class Storage {
  public abstract exists: (id: string) => Promise<boolean>
  public abstract get: (id: string) => Promise<ReadStream | null>
  public abstract put: (id: string, contents: ReadStream | ReadableStream) => Promise<void>
  public abstract delete: (id: string) => Promise<void>

  public getPath(id?: string) {
    return path.join(config.mounts.staticFiles, this.directory, id ?? '')
  }

  constructor(private directory: string) {
    if (!fs.existsSync(this.getPath())) {
      fs.mkdirSync(this.getPath(), { recursive: true })
    }
  }

  protected async existsFile(id: string): Promise<boolean> {
    try {
      await fsp.access(this.getPath(id), fs.constants.R_OK)
      return true
    } catch {
      return false
    }
  }

  protected async getFile(id: string) {
    if (!(await this.existsFile(id))) {
      return null
    }

    return fs.createReadStream(this.getPath(id))
  }

  protected async putFile(id: string, data: ReadStream | ReadableStream) {
    await this.deleteFile(id)

    await stream.pipeline(data, await this.createWriteStream(id))
  }

  protected async createWriteStream(id: string) {
    return fs.createWriteStream(this.getPath(id))
  }

  protected async deleteFile(templateId: string) {
    if (!(await this.existsFile(templateId))) {
      return
    }

    await fsp.unlink(this.getPath(templateId))
  }
}
