import { boot } from 'quasar/wrappers'
import { DirectiveBinding } from 'vue'

export default boot(({ app, ssrContext }) => {
  if (ssrContext) {
    app.directive('click-outside', {
      mounted() {
        return
      },
      beforeUnmount() {
        return
      },
    })

    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createOnClickOutside =
    (element: HTMLElement, binding: DirectiveBinding) => (event: MouseEvent) => {
      if (!(element === event.target || element.contains(event.target as Node))) {
        typeof binding.value === 'function' && binding.value(event, element)
      }
    }

  app.directive('click-outside', {
    mounted(el, binding) {
      el.clickOutsideEvent = createOnClickOutside(el, binding)

      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    beforeUnmount(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  })
})
