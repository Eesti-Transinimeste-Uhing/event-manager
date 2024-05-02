import { FluentBundle, FluentResource } from '@fluent/bundle'

import messages from '../en-GB.ftl?raw'

const bundle = new FluentBundle('en-GB')
bundle.addResource(new FluentResource(messages))

export { bundle }
