import fs from 'node:fs'
import path from 'node:path'

import { Compiler } from '@decentm/concourse-ts'

const dir = path.resolve(__dirname, './pipelines')
const compilation = new Compiler.Compilation()

const files = fs.readdirSync(dir)

const main = async () => {
  for (const filename of files) {
    const { default: pipeline } = await import(path.resolve(dir, filename))
    const warnings = compilation.validate(pipeline)

    if (warnings.has_fatal()) {
      console.error(
        warnings
          .get_warnings()
          .map((warning) => warning.messages.join(', '))
          .join('\n')
      )

      process.exit(1)
    }

    const result = compilation.compile(pipeline)

    fs.writeFileSync(
      path.resolve(__dirname, '../../.ci', result.pipeline.filename),
      result.pipeline.content
    )
  }
}

main()
