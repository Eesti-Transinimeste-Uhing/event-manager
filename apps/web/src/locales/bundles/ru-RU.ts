import { FluentBundle, FluentResource } from '@fluent/bundle'

import messages from '../ru-RU.ftl?raw'

const bundle = new FluentBundle('ru-RU')
bundle.addResource(new FluentResource(messages))

export { bundle }
