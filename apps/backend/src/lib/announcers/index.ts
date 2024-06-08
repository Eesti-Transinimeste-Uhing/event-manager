import { Form } from '../../entity/form'
import { Announcer as AnnouncerEntity } from '../../entity/announcer'

export abstract class Announcer {
  constructor(protected entity: AnnouncerEntity) {}

  abstract announce(form: Form): Promise<void>
}
