export function useI18nData() {
  const { locale, setLocale, t } = useI18n()
  function getI18nData(obj: any, key: string) {
    if (locale.value === "en") {
      return obj[key]
    } else if (locale.value === "cn") {
      return obj[key + "_cn"]
    }
  }
  return { getI18nData }
}
