import fs from 'node:fs'
import path from 'node:path'

import sharp from 'sharp'
import { pipeline } from 'stream/promises'

const width = 100
const height = 25
const label = 'Loooooooooong Text' // "Medium Text" "Short"

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${height} ${height + 2}">
  <text x="50%" y="50%" text-anchor="middle" dy="0.25em" fill="#000">${label}</text>
</svg>
`

const svg_buffer = Buffer.from(svg)

export const textgen = (options: { height: number; width: number; top: number }) => {
  return sharp({
    create: {
      width: 1920,
      height: 1080,
      channels: 4,
      background: 'transparent',
    },
  })
    .composite([{ input: svg_buffer, top: 0, left: 0 }])
    .png()
}

const outPath = path.resolve(__dirname, 'textgen-out.png')

if (fs.existsSync(outPath)) {
  fs.unlinkSync(outPath)
}

const write = fs.createWriteStream(outPath)

pipeline(textgen({ width: 1920, height: 500, top: 100 }), write).then(() => console.log('DONE!'))
