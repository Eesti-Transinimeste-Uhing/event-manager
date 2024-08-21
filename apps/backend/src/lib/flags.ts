import FlagsmithNodejs, { Flags } from "flagsmith-nodejs"; // Add this line if you're using flagsmith via npm
import { BaseFlag } from "flagsmith-nodejs/build/sdk/models";
import { log } from "../log";
import { config } from "../config";

export const Flag = {
  announcements: 'announcements',
} as const;

export type Flag = typeof Flag[keyof typeof Flag];

class Flagsmith {
  private flagsmith?: FlagsmithNodejs

  constructor() {
    this.flagsmith = new FlagsmithNodejs(config.flagsmith)
  }

  private static flags: Flags

  private static pollInterval: NodeJS.Timeout | null = null

  public async init() {
    if (Flagsmith.pollInterval) {
      return
    }

    if (!this.flagsmith) {
      throw new Error('Flagsmith config is missing')
    }

    try {
      const flags = await this.getFlags()
      if (flags) Flagsmith.flags = flags
    } catch (error) {
      if (error instanceof Error) {
        log.error(error, 'flagsmith init')
      }
    }

    Flagsmith.pollInterval = setInterval(async () => {
      try {
        const flags = await this.getFlags()
        if (flags) Flagsmith.flags = flags
      } catch (error) {
        if (error instanceof Error) {
          log.error(error, 'flagsmith poll')
        }
      }
    }, config.flagsmith.pollIntervalSeconds * 1000)
  }

  private async getFlags() {
    return await this.flagsmith?.getEnvironmentFlags();
  }

  public getFlag(flag: Flag) {
    if (!Flagsmith.flags) {
      return new BaseFlag(undefined, false, false)
    }

    return Flagsmith.flags.getFlag(flag)
  }

  public status() {
    return !!Flagsmith.flags
  }
}

export const flags = new Flagsmith()
