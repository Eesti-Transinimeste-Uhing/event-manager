import flagsmith from 'flagsmith' // Add this line if you're using flagsmith via npm
import { IFlags } from 'flagsmith/types'
import { config } from 'src/config'
import { ref } from 'vue'

export const useFlags = () => {
  const flags = ref<IFlags<string>>({})

  flagsmith.init({
    ...config.flagsmith,
    onChange: () => {
      flags.value = flagsmith.getAllFlags()
    },
  })

  return { flags }
}
