import { FluentBundle, FluentResource } from '@fluent/bundle'
import messages from './ru-RU.ftl?raw'

export const bundle = new FluentBundle('ru-RU')

bundle.addResource(new FluentResource(messages))
