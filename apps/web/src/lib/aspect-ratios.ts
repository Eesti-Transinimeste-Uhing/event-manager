export const AspectRatio = {
  square: 1 / 1,
  portrait: 1 / 2,
  widescreen: 16 / 9,
  fullscreen: 4 / 3,
  discordEvent: 440 / 180,
  facebookCover: 1920 / 1005,
  facebookEvent: 548 / 203,
} as const

export type AspectRatio = (typeof AspectRatio)[keyof typeof AspectRatio]
