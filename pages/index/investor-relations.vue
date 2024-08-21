<script setup lang="ts">

</script>

<template>
  <div class="ir-container">
    <div class="ir-content">
      <div class="ir-video">
        <video controls fit="cover" controlslist="nodownload noplaybackrate"
               :src="$t('pageData.investorRelations.video')">
        </video>
      </div>
      <div class="ir-info">
        <div class="ir-info-title">
          <span class="ir-info-space"></span>
          {{ $t("pageData.investorRelations.title") }}
        </div>
        <ul class="ir-info-content">
          <li>
            {{
              $t("pageData.investorRelations.secretaryLabel") + "：" + $t("pageData.investorRelations.secretaryValue")
            }}
          </li>
          <li>
            {{ $t("pageData.investorRelations.emailLabel") + "：" + $t("pageData.investorRelations.emailValue") }}
          </li>
          <li>
            {{
              $t("pageData.investorRelations.stockCodeLabel") + "：" + $t("pageData.investorRelations.stockCodeValue")
            }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.ir-container {
  background: #f8f8f8 url('/img/investor-relations/bg.png') no-repeat bottom;
  background-size: contain;
  min-height: 922px;
  overflow: hidden;
}

.ir-content {
  background: #fff;
  display: flex;
  justify-content: space-between;
  margin: 64px auto 0;
  position: relative;
  width: 1200px;
  border-radius: 8px;
  padding: 16px;
  height: 514px;
}

.ir-video {
  position: relative;
  width: 864px;
  z-index: 9;
}

.ir-info {
  background: url('/img/investor-relations/info-bg.png') no-repeat 50%;
  background-size: contain;
  right: 0;
  top: 0;
  z-index: 1;
  flex: 1;
  box-sizing: border-box;
  padding-left: 36px;

  &-space {
    background: #ffe256;
    height: 19px;
    margin-right: 4px;
    width: 6px;
  }

  &-title {
    align-items: center;
    color: #4a4a4a;
    display: flex;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
  }

  &-content {
    color: #4a4a4a;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    line-height: 30px;
    list-style: none;
    margin-top: 16px;
    padding: 0;
  }
}
</style>