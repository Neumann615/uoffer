<script setup lang="ts">
import { decryptData } from "#imports";
const route = useRoute();
const isRenderFooter = computed(() => {
  const list = ["paper-worker"];
  let flag = true;
  list.forEach((item) => {
    if (route.path.includes(item)) {
      flag = false;
    }
  });
  return flag;
});
</script>

<template>
  <div v-if="isRenderFooter" class="footer">
    <!-- 上半部分 -->
    <div class="footer-top">
      <div class="footer-contact">
        <div class="footer-section-title">联系我们</div>
        <div
          v-for="(item, index) in decryptData($t('footer.contactUs'))"
          class="mb-12"
          style="letter-spacing: 1px"
        >
          {{ item.label + ": " + item.value }}
        </div>
      </div>
      <div class="footer-links">
        <div class="footer-link-col">
          <div class="footer-section-title">
            {{ $t("footer.customerService.title") }}
          </div>
          <a
            class="block mb-12 hover-link color-#545454"
            v-for="(item, index) in decryptData(
              $t('footer.customerService.dataList')
            )"
            :href="item.link"
            ><span>
              {{ item.text }}
            </span></a
          >
        </div>
        <div class="footer-link-col">
          <div class="footer-section-title">
            {{ $t("footer.courseClassification.title") }}
          </div>
          <div>
            <a
              :href="item.link"
              v-for="(item, index) in decryptData(
                $t('footer.courseClassification.dataList')
              )"
              class="block mb-12 hover-link color-#545454"
            >
              <span>
                {{ item.text }}
              </span></a
            >
          </div>
        </div>
      </div>
    </div>
    <ElDivider></ElDivider>
    <!-- 下半部分 -->
    <div class="footer-bottom">
      <div class="footer-bottom-left">
        <div class="footer-logos">
          <img src="/img/text-logo.png" class="footer-logo-main" />
          <img class="footer-logo-sub" :src="$t('footer.baseInfo.img')" />
        </div>
        <div>
          <div
            class="color-#545454 mb-4 text-13"
            v-for="(item, index) in decryptData(
              $t('footer.baseInfo.copyrightList')
            )"
          >
            {{ item }}
          </div>
        </div>
        <div class="color-#545454 text-14 mt-8 footer-address">
          {{ $t("footer.baseInfo.address") }}
        </div>
      </div>
      <div class="footer-bottom-right">
        <div class="footer-article-links">
          <a
            v-for="(item, index) in decryptData($t('footer.article'))"
            :href="item.link"
            class="hover-link color-#545454"
          >
            {{
              item.text +
              (index < decryptData($t("footer.article")).length - 1
                ? " - "
                : "")
            }}
          </a>
        </div>
        <div class="mt-12 flex gap-16 items-start footer-icp">
          <div class="flex items-start">
            <div class="mr-4">
              <img src="/img/home/police.png" />
            </div>
            <div class="font-ST" style="color: rgba(0, 0, 0, 0.87)">
              京公网安备
            </div>
          </div>
          <div>
            <div class="text-14" style="color: rgba(0, 0, 0, 0.87)">
              x1x1x50x04x9xx号
            </div>
            <div class="text-14 mt-4" style="color: rgba(0, 0, 0, 0.87)">
              x1x1x50x0x0x3x号
            </div>
          </div>
          <div style="margin-right: 0">
            <a
              href="http://beian.miit.gov.cn/"
              class="color-#545454 hover-link text-14"
              >京ICP备202x0x1x6x号</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.footer {
  margin: auto;
  padding: 40px 16px 20px;
  position: relative;
  max-width: 1250px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 40px 24px 20px;
  }

  @media (min-width: 1024px) {
    padding: 40px 0 20px;
  }
}

.footer-top {
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 48px;
  }
}

.footer-contact {
  flex-shrink: 0;
}

.footer-links {
  display: flex;
  gap: 24px;

  @media (min-width: 768px) {
    gap: 48px;
  }
}

.footer-link-col {
  min-width: 100px;
}

.footer-section-title {
  color: #545454;
  font-weight: 700;
  margin-bottom: 20px;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.footer-bottom-left {
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
}

.footer-bottom-right {
  text-align: center;

  @media (min-width: 768px) {
    text-align: right;
  }
}

.footer-logos {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
}

.footer-logo-main {
  width: 160px;

  @media (min-width: 768px) {
    width: 200px;
  }
}

.footer-logo-sub {
  width: 80px;

  @media (min-width: 768px) {
    width: 114px;
  }
}

.footer-address {
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
}

.footer-article-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
}

.footer-icp {
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
}

.website-link {
  letter-spacing: 1px;
  font-family: avalonregular, Helvetica, Arial, "Microsoft Yahei",
    MicrosoftYaHei, "微软雅黑", STXihei, "华文细黑", sans-serif !important;
}

.hover-link {
  cursor: pointer;
  text-decoration: none;
}

.hover-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
  color: #409eff;
}
</style>
