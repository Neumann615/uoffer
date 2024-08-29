<script setup lang="ts">
import {decryptData} from "#imports"
</script>

<template>
  <div class="footer">
    <div class="flex justify-between">
      <div>
        <div v-for="(item,index) in decryptData($t('footer.linkList'))">
          <a :href="item.link" class="flex mb-4">
            <img :src="item.img" style="object-fit: contain;width: 15px" class="mr-8">
            <span class="website-link hover-link color-#545454">{{
                item.text
              }}</span>
          </a>
        </div>
      </div>
      <div class="flex" style="letter-spacing:1px;">
        <div class="ml-24 mr-24">
          <div class="font-700 color-#545454 text-15 mb-8">{{ $t('footer.customerService.title') }}</div>
          <a class="block mb-8 hover-link color-#545454"
             v-for="(item,index) in decryptData($t('footer.customerService.dataList'))" :href="item.link"
          ><span
          >
              {{ item.text }}
            </span></a>
        </div>
        <div class="ml-24 mr-24">
          <div class="font-700 color-#545454 text-15 mb-8">{{ $t('footer.currencyAndLanguage.title') }}</div>
          <div>{{ $t('footer.currencyAndLanguage.text') }}</div>
        </div>
        <div class="ml-24 mr-24">
          <div class="font-700 color-#545454 text-15 mb-8">{{ $t('footer.courseClassification.title') }}</div>
          <div>
            <a :href="item.link"
               v-for="(item,index) in decryptData($t('footer.courseClassification.dataList'))"
               class="block mb-8 hover-link color-#545454">
              <span>
              {{ item.text }}
            </span></a>
          </div>
        </div>
      </div>
      <div class="flex gap-8">
        <div v-for="(item,index) in decryptData($t('footer.qrCodeList')) " class="qr-item qr-scan-item gap-12">
          <img :src="item.img" alt="" class="w-114 h-114">
          <div class="text-center color-#4a4a4a text-13 mt-4">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
    <ElDivider></ElDivider>
    <div class="flex justify-between flex-items-center">
      <div>
        <div class="flex flex-items-center mb-12">
          <div class="font-600 text-28 tracking-widest">{{ $t('footer.baseInfo.title') }}</div>
          <img class="w-114" :src="$t('footer.baseInfo.img')"/>
        </div>
        <div>
          <div class="color-#545454 mb-4 text-13" v-for="(item,index) in decryptData($t('footer.baseInfo.copyrightList'))">
            {{ item }}
          </div>
        </div>
        <div class="color-#545454 text-14 mt-8">
          {{ $t('footer.baseInfo.address') }}
        </div>
      </div>
      <div>
        <div class="text-right">
          <a v-for="(item,index) in decryptData($t('footer.article'))"
             :href="item.link"
             class="hover-link color-#545454">
            {{
              item.text +
              (index < decryptData($t('footer.article')).length - 1 ? " - " : "")
            }}
          </a>
        </div>
        <div class="mt-12 flex gap-4">
          <div class="flex">
            <div class="mr-4">
              <img src="/img/home/police.png">
            </div>
            <div class="font-ST">京公网安备</div>
          </div>
          <div>
            <div>11111111111111号</div>
            <div>11111111111111号</div>
          </div>
          <div style="margin-right: 0"><a href="http://beian.miit.gov.cn/"
                                          class="color-#545454 hover-link">京ICP备9294628746号</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.footer {
  margin: auto;
  padding: 40px 0 20px;
  position: relative;
  width: 1400px;
}

.website-link {
  letter-spacing: 1px;
  font-family: avalonregular, Helvetica, Arial, "Microsoft Yahei", MicrosoftYaHei, "微软雅黑", STXihei, "华文细黑", sans-serif !important;
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