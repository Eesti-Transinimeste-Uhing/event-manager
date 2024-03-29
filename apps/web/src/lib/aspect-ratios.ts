export const AspectRatio = {
  square: 1 / 1,
  discordEvent: 440 / 180,
  facebookCover: 1920 / 1005,
  facebookEvent: 548 / 203,
} as const

export type AspectRatio = (typeof AspectRatio)[keyof typeof AspectRatio]
