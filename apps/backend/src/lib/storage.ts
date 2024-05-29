import path from 'node:path'
import fs from 'node:fs'
import fsp from 'node:fs/promises'

import { config } from '../config'

export abstract class Storage {
  public abstract exists: (id: string) => Promise<boolean>
  public abstract get: (id: string) => Promise<Buffer | null>
  public abstract put: (id: string, contents: Buffer) => Promise<void>
  public abstract delete: (id: string) => Promise<void>

  public getPath(id?: string) {
    return path.join(config.mounts.staticFiles, this.directory, id ?? '')
  }

  constructor(protected directory: string) {
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

  protected async getFile(id: string): Promise<Buffer | null> {
    if (!(await this.existsFile(id))) {
      return null
    }

    return fsp.readFile(this.getPath(id))
  }

  protected async putFile(id: string, data: Buffer) {
    await this.deleteFile(id)
    await fsp.writeFile(this.getPath(id), data)
  }

  protected async createWriteStream(id: string) {
    return fs.createWriteStream(this.getPath(id))
  }

  protected async deleteFile(id: string) {
    if (!(await this.existsFile(id))) {
      return
    }

    await fsp.unlink(this.getPath(id))
  }
}
