import { FluentBundle, FluentResource } from '@fluent/bundle'
import messages from './en-GB.ftl?raw'

export const bundle = new FluentBundle('en-GB')

bundle.addResource(new FluentResource(messages))
