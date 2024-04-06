import { ComputedRef, Ref, onMounted, ref, watch } from 'vue'

type ImgData = {
  dimensions: [number, number]
  ratio: number
  image: HTMLImageElement
}

const getImgData = (src: string): Promise<ImgData> => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      return resolve({
        dimensions: [img.width, img.height],
        ratio: img.width / img.height,
        image: img,
      })
    }

    img.onerror = (event, source, linenum, colnum, error) => {
      return reject(error)
    }

    img.src = src
  })
}

const getLocalFile = (value: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = (event) => {
      if (typeof event.target?.result !== 'string') {
        return
      }

      return resolve(event.target?.result)
    }

    fileReader.onerror = (event) => {
      return reject(event.target?.error)
    }

    fileReader.readAsDataURL(value)
  })
}

const getNameFromUrl = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1, url.length)
}

export const useFilePreview = (
  file: Ref<File | string | null> | ComputedRef<File | string | null>
) => {
  const loading = ref(true)

  const preview = ref('')
  const dimensions = ref([256, 256])
  const ratio = ref(1)
  const size = ref(0)
  const name = ref('')
  const image = ref<HTMLImageElement | null>(null)

  const generatePreview = async () => {
    if (!file.value) {
      preview.value = ''
      return
    }

    if (typeof file.value === 'string') {
      name.value = getNameFromUrl(file.value)
    } else {
      name.value = file.value.name
      size.value = file.value.size
    }

    const fileValue = typeof file.value === 'string' ? file.value : await getLocalFile(file.value)
    const imgData = await getImgData(fileValue)

    preview.value = fileValue
    dimensions.value = imgData.dimensions
    ratio.value = imgData.ratio
    image.value = imgData.image
  }

  watch(file, generatePreview)

  onMounted(generatePreview)

  return {
    name,
    size,
    loading,
    ratio,
    preview,
    dimensions,
    image,
  }
}
