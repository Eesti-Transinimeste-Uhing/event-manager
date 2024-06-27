import { AnnouncerType } from 'src/graphql/generated/graphql'

export const getIconForType = (type: AnnouncerType) => {
  switch (type) {
    case AnnouncerType.Discord:
      return 'lab la-discord'
    case AnnouncerType.Facebook:
      return 'lab la-facebook'
    case AnnouncerType.Instagram:
      return 'lab la-instagram'
    case AnnouncerType.Unset:
    default:
      return 'las la-question'
  }
}
