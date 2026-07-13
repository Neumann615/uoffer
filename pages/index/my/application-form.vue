<script setup lang="ts">
import type { FormInstance } from "element-plus";

const formRef = ref<FormInstance>();
const submitting = ref(false);

const form = reactive({
  name: "",
  email: "",
  phone: "",
  targetCountry: "",
  targetLevel: "4",
  currentEducation: "",
  budget: "",
  message: "",
});

const countryOptions = [
  { label: "英国", value: "uk" },
  { label: "澳大利亚", value: "au" },
  { label: "新西兰", value: "nz" },
  { label: "新加坡", value: "sg" },
  { label: "中国香港", value: "hk" },
  { label: "爱尔兰", value: "ie" },
];

const levelOptions = [
  { label: "本科", value: "2" },
  { label: "硕士预科", value: "3" },
  { label: "硕士", value: "4" },
  { label: "博士", value: "5" },
];

const rules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入有效的邮箱地址", trigger: "blur" },
  ],
  phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
  targetCountry: [{ required: true, message: "请选择目标国家", trigger: "change" }],
};

async function submitForm() {
  if (!formRef.value) return;
  const valid = await formRef.value.validate().catch(() => false);
  if (!valid) return;

  submitting.value = true;
  // 模拟提交
  setTimeout(() => {
    submitting.value = false;
    ElMessage.success("申请已提交，我们的顾问将在24小时内与您联系！");
  }, 1500);
}
</script>

<template>
  <div class="ma w-[80%] mb-200">
    <div class="mb-36 mt-80 text-20 font-550 color-#666">申请表单</div>

    <div class="bg-white rounded-8 border-1 border-#eee pa-40 max-w-800">
      <ElForm
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="left"
      >
        <ElFormItem label="姓名" prop="name">
          <ElInput v-model="form.name" placeholder="请输入您的姓名" />
        </ElFormItem>

        <ElFormItem label="邮箱" prop="email">
          <ElInput v-model="form.email" placeholder="请输入您的邮箱" />
        </ElFormItem>

        <ElFormItem label="电话" prop="phone">
          <ElInput v-model="form.phone" placeholder="请输入您的电话" />
        </ElFormItem>

        <ElFormItem label="目标国家" prop="targetCountry">
          <ElSelect v-model="form.targetCountry" placeholder="请选择留学目标国家">
            <ElOption
              v-for="c in countryOptions"
              :key="c.value"
              :label="c.label"
              :value="c.value"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="申请学位">
          <ElSelect v-model="form.targetLevel" placeholder="请选择申请学位">
            <ElOption
              v-for="l in levelOptions"
              :key="l.value"
              :label="l.label"
              :value="l.value"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="当前学历">
          <ElInput v-model="form.currentEducation" placeholder="如：本科在读" />
        </ElFormItem>

        <ElFormItem label="预算范围">
          <ElInput v-model="form.budget" placeholder="如：20-30万/年" />
        </ElFormItem>

        <ElFormItem label="补充说明">
          <ElInput
            v-model="form.message"
            type="textarea"
            :rows="4"
            placeholder="请描述您的具体情况和需求"
          />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="primary"
            size="large"
            :loading="submitting"
            @click="submitForm"
          >
            {{ submitting ? "提交中..." : "提交申请" }}
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>
