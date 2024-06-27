import { AnnouncerController } from '../controller/announcer'
import { FormController } from '../controller/form'
import { TemplateController } from '../controller/template'
import { UserController } from '../controller/user'
import { createQueues } from '../queues'

export const userController = new UserController()
export const templateController = new TemplateController()
export const formController = new FormController()
export const announcerController = new AnnouncerController()

export const queues = createQueues()
