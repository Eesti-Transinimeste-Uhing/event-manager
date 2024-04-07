import sharp from 'sharp'

export type TextgenOptions = {
  height: number
  width: number
  top: number
  left: number
  content: string
  colour: string
}

type SvgOptions = {
  height: number
  width: number
  content: string
  colour: string
}

const svg = (options: SvgOptions) => `
<svg height="${options.height}" width="${options.width}">
    <text
      font-size="${options.height}px"
      fill="${options.colour}"
      y="${options.height - options.height / 3.5}"
    >
      ${options.content}
    </text>
</svg>
`

export const textGen = (options: TextgenOptions) => {
  const svg_buffer = Buffer.from(
    svg({
      height: options.height,
      width: options.width,
      colour: options.colour,
      content: options.content,
    })
  )

  return sharp({
    create: {
      width: options.width,
      height: options.height,
      channels: 4,
      background: 'transparent',
    },
  }).composite([{ input: svg_buffer, top: options.top, left: options.left }])
}
