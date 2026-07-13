<script setup lang="ts">
import { decryptData, useRouter } from "#imports";
import { ArrowDown, Menu, Close } from "@element-plus/icons-vue";
import { useAuthStore } from "~/store/auth";
import { useCommonStore } from "~/store/common";
import type { CourseSearchCategoryItem } from "~/type";
const { t } = useI18n();

const { data } = await useFetch("/api/web/university/applylist");
const commonStore = useCommonStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const activeKey = ref(route.path);
const showModule = ref<"university" | "course">("university");
const applyUniversityList = computed(() => {
  return convertTo2DArray(data.value, 6);
});
const isShowPopover = ref(false);
const currentMainCourseType = ref();
const currentLevel = ref();
const currentCourseTypeList = ref<Array<CourseSearchCategoryItem> | null>([]);
const mobileMenuOpen = ref(false);
const mobileCourseExpanded = ref(false);

const menuList = computed(() => {
  let _menuList = decryptData(t("header.menu"));
  if (!authStore.webLoginResult.apiToken?.length) {
    _menuList = _menuList.filter(
      (item: { key: string; label: string }) =>
        item.key !== "/my/application-status"
    );
  }
  return _menuList;
});

function setCourseSearchFilter(categories?: Number[]) {
  mobileMenuOpen.value = false;
  router.push({
    path: "/course",
    query: {
      level: currentLevel.value,
      categories: categories ? categories.toString() : null,
    },
  });
}

function toUniversitySearch() {
  mobileMenuOpen.value = false;
  router.push({
    path: "/university",
  });
}

function toUniversityDetail(id: string) {
  mobileMenuOpen.value = false;
  router.push({
    path: "/university-detail/" + id,
  });
}

function backToHome() {
  mobileMenuOpen.value = false;
  router.push({
    path: "/",
  });
}

function toMyBag() {
  router.push({
    path: "/bag",
  });
}

function onMenuClick(item: any) {
  mobileMenuOpen.value = false;
  if (item.key === "/course") {
    mobileCourseExpanded.value = !mobileCourseExpanded.value;
    mobileMenuOpen.value = true;
    return;
  }
  mobileCourseExpanded.value = false;
  activeKey.value = item.key;
  router.push({ path: item.key });
}

function onMobileCourseSubClick(categories?: Number[]) {
  setCourseSearchFilter(categories);
  mobileMenuOpen.value = false;
  mobileCourseExpanded.value = false;
}

watch(
  () => activeKey.value,
  () => {
    router.push({
      path: activeKey.value,
    });
  },
  { immediate: false }
);

watch(
  () => route.path,
  () => {
    activeKey.value = route.path;
  }
);

watch(
  () => authStore.webLoginResult.apiToken,
  () => {
    if (authStore.webLoginResult.apiToken) {
      commonStore.getCartList();
    }
  },
  { immediate: false }
);

onMounted(() => {
  if (authStore.webLoginResult.apiToken) {
    commonStore.getCartList();
  }
});
</script>

<template>
  <div class="h-88">
    <div class="pos-fixed w-full bg-white z-999 header-wrapper">
      <!-- Top bar -->
      <div
        class="flex w-full flex-justify-between flex-items-center h50 pr-12 overflow-hidden header-top"
      >
        <div class="cursor-pointer header-logo" @click.stop="backToHome">
          <img src="/img/text-logo.png" />
        </div>
        <div class="flex gap-16 md:gap-36 items-center">
          <div v-if="authStore.webLoginResult.apiToken" class="text-center hidden md:block">
            <div class="text-13 mb-2 font-bold">欢迎</div>
            <div class="text-12 font-bold">
              {{ authStore.webLoginResult.email }}
            </div>
          </div>
          <div class="w-40 cursor-pointer pos-relative" @click.stop="toMyBag">
            <img src="/img/yellow-mailer.png" />
            <div
              v-if="authStore.webLoginResult.apiToken"
              class="absolute left-0 top-0 w-full h-full flex items-center justify-center"
            >
              {{ commonStore.cartList?.length }}
            </div>
          </div>
          <!-- Mobile menu toggle -->
          <div
            class="md:hidden w-40 h-40 flex items-center justify-center cursor-pointer text-20"
            @click.stop="mobileMenuOpen = !mobileMenuOpen"
          >
            <el-icon v-if="!mobileMenuOpen"><Menu /></el-icon>
            <el-icon v-else><Close /></el-icon>
          </div>
        </div>
      </div>

      <!-- Desktop menu bar -->
      <div class="header-menu hidden md:flex">
        <template v-for="item in menuList">
          <el-popover
            :offset="2"
            v-model:visible="isShowPopover"
            :show-arrow="false"
            width="100%"
            v-if="item.key === '/course'"
          >
            <template #reference>
              <div
                class="header-menu-item text-13 flex items-center"
                @click="activeKey = item.key"
              >
                <div class="mr-5">{{ item.label }}</div>
                <el-icon :class="isShowPopover ? 'rotate-[180deg]' : ''">
                  <ArrowDown></ArrowDown>
                </el-icon>
              </div>
            </template>
            <div class="w-full flex h-a">
              <div class="w-260 flex justify-center pt-100">
                <div>
                  <div
                    :class="
                      showModule === 'university' ? 'underline font-550' : ''
                    "
                    class="cursor-pointer hover:underline"
                    @mouseover="showModule = 'university'"
                  >
                    大学
                  </div>
                  <div class="h-24"></div>
                  <div
                    :class="showModule === 'course' ? 'underline font-550' : ''"
                    class="cursor-pointer hover:underline"
                    @mouseover="showModule = 'course'"
                  >
                    课程
                  </div>
                </div>
              </div>
              <div
                class="flex-1 w-1 pl-36"
                style="border-left: 1px solid rgba(0, 0, 0, 0.1)"
              >
                <div class="flex" v-show="showModule === 'university'">
                  <div
                    class="w-25% max-w-350px h-full"
                    v-for="(item1, index1) in applyUniversityList"
                  >
                    <div
                      v-for="item2 in item1"
                      @click="toUniversityDetail(item2.id)"
                      class="h-48 flex items-center cursor-pointer hover:underline"
                    >
                      {{ item2.chinese_name }}
                    </div>
                    <div
                      class="h-48 flex items-center cursor-pointer hover:underline"
                      @click.stop="toUniversitySearch"
                      v-if="index1 === applyUniversityList.length - 1"
                    >
                      更多...
                    </div>
                  </div>
                </div>
                <div class="flex" v-show="showModule === 'course'">
                  <div class="w-200">
                    <div
                      class="h-36 flex items-center cursor-pointer hover:underline"
                      v-for="item in commonStore.$state.courseSearchOptions
                        .levels"
                      @click.stop="
                        () => {
                          setCourseSearchFilter();
                        }
                      "
                      @mouseover="
                        () => {
                          currentLevel = item.id;
                        }
                      "
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="w-300">
                    <div
                      class="h-36 flex items-center cursor-pointer hover:underline"
                      @mouseover="
                        () => {
                          currentMainCourseType = item.id;
                          currentCourseTypeList = item.subs;
                        }
                      "
                      @click.stop="setCourseSearchFilter([item.id])"
                      v-for="item in commonStore.$state.courseSearchOptions
                        .categories"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="w-300" v-if="currentCourseTypeList?.length">
                    <div
                      @click.stop="
                        setCourseSearchFilter([currentMainCourseType, item.id])
                      "
                      class="h-36 flex items-center cursor-pointer hover:underline"
                      v-for="item in currentCourseTypeList.slice(0, 10)"
                    >
                      {{ item.name }}
                    </div>
                    <div
                      @click.stop="
                        setCourseSearchFilter([currentMainCourseType])
                      "
                      class="h-36 flex items-center cursor-pointer hover:underline"
                    >
                      更多...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-popover>
          <div
            v-else
            class="header-menu-item ellipsis text-13"
            :class="{ 'is-selected': item.key === activeKey }"
            @click="activeKey = item.key"
          >
            {{ item.label }}
          </div>
        </template>
      </div>
    </div>
  </div>

  <!-- Mobile drawer overlay -->
  <div
    v-if="mobileMenuOpen"
    class="md:hidden pos-fixed inset-0 z-1000"
    @click.stop="mobileMenuOpen = false"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
  </div>

  <!-- Mobile slide-in drawer -->
  <div
    class="md:hidden pos-fixed top-0 right-0 h-full w-280 bg-white z-1001 transition-transform duration-300 overflow-y-auto"
    :class="mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="flex justify-between items-center p-16 border-b">
      <div class="text-16 font-bold">导航菜单</div>
      <div class="cursor-pointer" @click.stop="mobileMenuOpen = false">
        <el-icon size="20"><Close /></el-icon>
      </div>
    </div>
    <div class="py-8">
      <div
        v-for="item in menuList"
        :key="item.key"
      >
        <!-- Course item with submenu -->
        <div v-if="item.key === '/course'">
          <div
            class="flex justify-between items-center px-20 py-14 cursor-pointer hover:bg-#f5f5f5 text-15"
            :class="{ 'font-bold color-#f2aa34': activeKey === item.key }"
            @click.stop="onMenuClick(item)"
          >
            <span>{{ item.label }}</span>
            <el-icon :class="mobileCourseExpanded ? 'rotate-180' : ''" class="transition-transform">
              <ArrowDown />
            </el-icon>
          </div>
          <!-- Course submenu accordion -->
          <div v-if="mobileCourseExpanded" class="bg-#fafafa border-t border-b py-8">
            <div class="px-20 py-8 text-13 font-bold color-#999">按课程分类</div>
            <div
              v-for="cat in commonStore.$state.courseSearchOptions?.categories"
              :key="cat.id"
              class="px-32 py-10 cursor-pointer hover:bg-#f0f0f0 text-14"
              @click.stop="onMobileCourseSubClick([cat.id])"
            >
              {{ cat.name }}
            </div>
            <div class="px-20 py-8 text-13 font-bold color-#999 mt-8">按大学查找</div>
            <div
              v-for="uni in (data?.value || []).slice(0, 8)"
              :key="uni.id"
              class="px-32 py-10 cursor-pointer hover:bg-#f0f0f0 text-14"
              @click.stop="toUniversityDetail(uni.id)"
            >
              {{ uni.chinese_name }}
            </div>
            <div
              class="px-32 py-10 cursor-pointer hover:bg-#f0f0f0 text-14 color-#409eff"
              @click.stop="toUniversitySearch"
            >
              更多大学...
            </div>
          </div>
        </div>
        <!-- Other menu items -->
        <div
          v-else
          class="px-20 py-14 cursor-pointer hover:bg-#f5f5f5 text-15 border-b border-#f0f0f0"
          :class="{ 'font-bold color-#f2aa34': item.key === activeKey }"
          @click.stop="onMenuClick(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-wrapper {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.header-top {
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 36px;
  }
}

.header-logo {
  width: 200px;

  @media (min-width: 768px) {
    width: 380px;
  }
}

.header-menu {
  align-items: center;
  box-sizing: border-box;
  background: #f8f8f8;
  border-bottom: 1px solid #d8d8d8;
  border-top: 1px solid #d8d8d8;
  display: flex;
  justify-content: center;
  gap: 12px;
  height: 40px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 767px) {
    gap: 4px;

    &-item {
      padding: 0 8px !important;
      font-size: 12px !important;
    }
  }

  &-item {
    padding: 0px 18px;
    color: rgb(51, 51, 51);
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    white-space: nowrap;
    i {
      transition: all 0.3s;
    }
  }

  &-item:hover {
    color: #000;
    font-weight: 600;
  }

  .is-selected {
    border-bottom: 2px solid #ffe256;
  }
}

// Ensure body doesn't scroll when mobile menu is open
:global(body.menu-open) {
  overflow: hidden;
}
</style>
