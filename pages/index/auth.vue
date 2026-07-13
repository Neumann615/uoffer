<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import type { WebLoginResult } from "~/type/auth";

const loginData = reactive({
  account: "",
  password: "",
  remember: false,
});
const router = useRouter();
const { setWebLoginResult } = useAuthStore();
const loggingIn = ref(false);
const showRegister = ref(false);

const registerData = reactive({
  account: "",
  password: "",
  confirmPassword: "",
});

function userLogin() {
  if (!loginData.account || !loginData.password) {
    ElMessage.warning("请输入账号和密码");
    return;
  }
  loggingIn.value = true;
  $fetch("/api/auth/signup/web-login", {
    method: "POST",
    body: JSON.stringify({
      account: loginData.account,
      password: loginData.password,
      remember: loginData.remember,
    }),
  }).then((res: WebLoginResult) => {
    if (res) {
      setWebLoginResult(res);
      ElMessage.success("登录成功");
      setTimeout(() => {
        router.replace({
          path: "/",
        });
      }, 1000);
    }
  }).catch(() => {
    ElMessage.error("登录失败，请检查账号和密码");
  }).finally(() => {
    loggingIn.value = false;
  });
}

function handleRegister() {
  if (!registerData.account || !registerData.password) {
    ElMessage.warning("请填写完整信息");
    return;
  }
  if (registerData.password !== registerData.confirmPassword) {
    ElMessage.warning("两次输入的密码不一致");
    return;
  }
  ElMessage.info("注册功能开发中，请联系客服创建账号");
  showRegister.value = false;
}

function handleForgotPassword() {
  ElMessage.info("请通过邮箱或电话联系客服重置密码");
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- 登录区域 -->
      <div class="auth-login">
        <div class="text-center color-#545454 text-18 mb-20">已注册用户</div>
        <ElForm :model="loginData" class="mb-24">
          <ElFormItem>
            <ElInput
              v-model="loginData.account"
              placeholder="我的电话号码/我的邮箱地址"
              size="large"
            ></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElInput
              type="password"
              v-model="loginData.password"
              placeholder="密码"
              size="large"
            ></ElInput>
          </ElFormItem>
        </ElForm>
        <div
          class="text-right mb-4 cursor-pointer font-550 text-15 hover:decoration-underline color-#409eff"
          @click="handleForgotPassword"
        >
          忘记密码
        </div>
        <div class="flex items-center mb-16">
          <ElCheckbox v-model="loginData.remember">记住用户名</ElCheckbox>
        </div>
        <button
          :disabled="loggingIn"
          @click.stop="userLogin"
          class="bg-#000 w-full color-#fff border-none py-12 px-16 b-rd-6 cursor-pointer hover:opacity-80"
        >
          {{ loggingIn ? "登录中..." : "登录" }}
        </button>
      </div>

      <!-- 注册区域 -->
      <div
        class="auth-register"
      >
        <div class="text-center color-#545454 text-18 mb-20">有录网新用户</div>

        <template v-if="!showRegister">
          <button
            @click="showRegister = true"
            class="bg-#ddd color-#000 w-full border-none py-12 px-16 b-rd-6 cursor-pointer hover:bg-#000 hover:color-#fff"
          >
            创建账号
          </button>
        </template>

        <template v-else>
          <ElForm :model="registerData" class="mb-16">
            <ElFormItem>
              <ElInput
                v-model="registerData.account"
                placeholder="手机号/邮箱"
                size="large"
              />
            </ElFormItem>
            <ElFormItem>
              <ElInput
                type="password"
                v-model="registerData.password"
                placeholder="设置密码"
                size="large"
              />
            </ElFormItem>
            <ElFormItem>
              <ElInput
                type="password"
                v-model="registerData.confirmPassword"
                placeholder="确认密码"
                size="large"
              />
            </ElFormItem>
          </ElForm>
          <button
            @click="handleRegister"
            class="bg-#000 w-full color-#fff border-none py-12 px-16 b-rd-6 cursor-pointer"
          >
            注册
          </button>
          <div
            class="text-center mt-8 text-13 color-#409eff cursor-pointer"
            @click="showRegister = false"
          >
            ← 返回登录
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px 120px;
  min-height: 60vh;
}

.auth-container {
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  max-width: 700px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 68px;
  }
}

.auth-login {
  flex: 1;
  max-width: 280px;
  margin: 0 auto;

  @media (min-width: 768px) {
    margin: 0;
  }
}

.auth-register {
  flex: 1;
  max-width: 388px;
  margin: 0 auto;
  padding-top: 32px;
  border-top: 1px solid #ececec;

  @media (min-width: 768px) {
    padding-top: 0;
    padding-left: 68px;
    margin-left: 0;
    border-top: none;
    border-left: 1px solid #ececec;
  }
}
</style>
