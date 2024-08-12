<script setup lang="ts">
import type {MenuOption} from 'naive-ui'
import {NMenu} from "naive-ui"

const activeKey = ref(null)
const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home"
  },
  {
    label: "学校申请",
    key: 'course'
  },
  {
    label: "排行榜",
    key: 'ranking'
  },
  {
    label: "学校申请",
    key: 'course'
  },
  {
    label: "留学攻略",
    key: 'strategy-for-studying-abroad'
  },
  {
    label: "我的申请",
    key: 'application-status'
  },
  {
    label: "投资者关系",
    key: 'investor-relations'
  },
  {
    label: '关于我们',
    key: 'about'
  },
  {
    label: '联系我们',
    key: "contact"
  }
]
</script>

<template>
  <div class="h-28">
    <div class="pos-fixed  w-full bg-white h-28 z-999">
      <div class="flex  w-full flex-justify-between  flex-items-center pa-3">
        <div>
          1
        </div>
        <div class="font-600 text-4xl tracking-widest">有录网</div>
        <div>有</div>
      </div>
      <div class="border-gray-200 border-b-2 border-t-2">
        <NMenu
            :collapsed="false"
            v-model:value="activeKey"
            mode="horizontal"
            :options="menuOptions"
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