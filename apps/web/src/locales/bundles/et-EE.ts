import { FluentBundle, FluentResource } from '@fluent/bundle'
import messages from './et-EE.ftl?raw'

export const bundle = new FluentBundle('et-EE')

bundle.addResource(new FluentResource(messages))
