import { boot } from 'quasar/wrappers'
import { fluent } from 'src/locales'

export default boot(({ app }) => {
  app.use(fluent)
})
