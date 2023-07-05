import { defineStore } from "pinia"
import { useDark, useToggle, useLocalStorage } from "@vueuse/core"
import { computed, ref } from "vue"
import { darkTheme } from "naive-ui"
import { Theme, Themes, ThemeItem } from "@/composables/settings"

export const useThemeStore = defineStore("themeStore", () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  const naiveTheme = computed(() => (isDark.value ? darkTheme : null))

  const currentThemeName: Theme = isDark.value ? Theme.Dark : Theme.Light
  const currentTheme = ref<ThemeItem | undefined>(
    Themes.find((item) => item.name === currentThemeName)
  )

  /* pixel value */
  const sideBarWidth = 48
  const taskLeftListViewPadding = 10

  function changeTheme(theme: Theme) {
    const themeItem = Themes.find((item) => item.name === theme)
    if (themeItem) {
      themeItem.handler()
      currentTheme.value = themeItem
    }
  }

  useLocalStorage("isDark", isDark)

  return {
    currentTheme,
    changeTheme,
    isDark,
    toggleDark,
    naiveTheme,
    sideBarWidth,
    taskLeftListViewPadding,
  }
})

let globalThemeStore: ReturnType<typeof useThemeStore>

// To avoid using store before initializing Pinia.
export const getGlobalThemeStore = () => {
  if (!globalThemeStore) globalThemeStore = useThemeStore()

  return globalThemeStore
}
