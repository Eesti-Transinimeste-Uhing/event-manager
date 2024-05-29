import sharp from 'sharp'
import { wrapText } from '../wrap-text'

export type TextgenOptions = {
  height: number
  width: number
  top: number
  left: number
  content: string
  lineWidth: number
  font: {
    size: number
    colour: string
    family: string
    weight: 'normal' | 'bold' | 'bolder' | 'lighter' | number
  }
}

export const textGen = (options: TextgenOptions) => {
  const svg = `
<svg height="${options.height}" width="${options.width}">
    <text
      font-size="${options.font.size}px"
      font-family="${options.font.family}"
      font-weight="${options.font.weight}"
      fill="${options.font.colour}"
      text-anchor="middle"
      y="${options.top + options.font.size}"
    >
      ${wrapText(options.lineWidth, options.content)
        .map((line, index) => {
          return `<tspan x="${options.left}" y="${options.top}" dy="${1.2 * (index + 1)}em">${line}</tspan>`
        })
        .join('\n')}
    </text>
</svg>
`

  const svg_buffer = Buffer.from(svg)

  return sharp({
    create: {
      width: options.width,
      height: options.height,
      channels: 4,
      background: 'transparent',
    },
  })
    .composite([{ input: svg_buffer, top: 0, left: 0 }])
    .png()
    .toBuffer()
}
