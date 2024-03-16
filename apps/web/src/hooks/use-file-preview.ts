import { ComputedRef, Ref, onMounted, ref, watch } from 'vue'

export const useFilePreview = (
  file: Ref<File | string | null> | ComputedRef<File | string | null>
) => {
  const preview = ref('')

  const dimensions = ref([256, 256])

  const generatePreview = () => {
    if (!file.value) {
      preview.value = ''
      return
    }

    if (typeof file.value === 'string') {
      preview.value = file.value
      return
    }

    const fileReader = new FileReader()

    fileReader.onload = (event) => {
      if (typeof event.target?.result !== 'string') {
        return
      }

      preview.value = event.target?.result ?? ''

      const img = new Image()

      img.onload = function () {
        dimensions.value = [img.width, img.height]
      }

      img.src = preview.value
    }

    fileReader.readAsDataURL(file.value)
  }

  watch(file, generatePreview)

  onMounted(generatePreview)

  return {
    preview,
    dimensions,
  }
}
