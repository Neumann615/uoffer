<script setup lang="ts">
import {decryptData} from "#imports"
import {NButton, NMenu} from "naive-ui"

const {locale, setLocale, t} = useI18n()
const activeKey = ref(null)
</script>

<template>
  <div class="h-28">
    <div class="pos-fixed w-full bg-white h-28 z-999">
      <div class="flex w-full flex-justify-between flex-items-center pa-3">
        <div>
          <NButton @click="setLocale('zh')">中文</NButton>
          <NButton @click="setLocale('en')">英文</NButton>
        </div>
        <div class="font-600 text-4xl tracking-widest">
          {{ $t("header.title") }}
        </div>
        <div></div>
      </div>
      <div class="border-gray-200 border-b-2 border-t-2">
        <NMenu
            :collapsed="false"
            v-model:value="activeKey"
            mode="horizontal"
            :options="decryptData($t('header.menu'))"
            responsive
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
::v-deep(.n-menu div:nth-child(1)) {
  justify-content: center;
}

::v-deep(.n-menu .v-overflow .n-submenu) {
  display: none;
}
</style>
