<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

const form = reactive({
  name: "",
  phone: "",
  email: "",
  wechat: "",
});

const saved = ref(false);

function handleSave() {
  // 模拟保存
  setTimeout(() => {
    saved.value = true;
    ElMessage.success("账户信息已更新");
    setTimeout(() => {
      saved.value = false;
    }, 2000);
  }, 500);
}
</script>

<template>
  <div class="ma w-[80%] mb-200">
    <div class="mb-36 mt-80 text-20 font-550 color-#666">账户信息</div>

    <div class="bg-white rounded-8 border-1 border-#eee pa-40 max-w-600">
      <div v-if="authStore.webLoginResult.apiToken" class="mb-24">
        <div class="text-14 color-#666 mb-8">登录账号</div>
        <div class="text-16 font-600">
          {{ authStore.webLoginResult.email || authStore.webLoginResult.phone }}
        </div>
      </div>

      <ElForm :model="form" label-width="80px" label-position="left">
        <ElFormItem label="姓名">
          <ElInput v-model="form.name" placeholder="请输入您的姓名" />
        </ElFormItem>

        <ElFormItem label="电话">
          <ElInput v-model="form.phone" placeholder="请输入您的电话" />
        </ElFormItem>

        <ElFormItem label="邮箱">
          <ElInput v-model="form.email" placeholder="请输入您的邮箱" />
        </ElFormItem>

        <ElFormItem label="微信">
          <ElInput v-model="form.wechat" placeholder="请输入您的微信号" />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" :loading="saved" @click="handleSave">
            {{ saved ? "已保存" : "保存修改" }}
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>
