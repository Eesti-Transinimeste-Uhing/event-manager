import { enumType, objectType } from 'nexus'
import { AnnouncerStatus } from '../../controller/announcer'

export const AnnouncerStatusEnum = enumType({
  name: 'AnnouncerStatus',
  members: AnnouncerStatus,
})

export const AnnouncerReadiness = objectType({
  name: 'AnnouncerReadiness',
  definition(t) {
    t.field('status', { type: 'AnnouncerStatus' })
  },
})
