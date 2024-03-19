import { AppDataSource } from '../data-source'
import { Template } from '../entity/template'

export const TemplateRepository = AppDataSource.getRepository(Template).extend({})
