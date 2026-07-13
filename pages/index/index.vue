<script lang="ts" setup>
import { decryptData } from "~/utils";
const { getI18nData } = useI18nData();
const router = useRouter();
const { data: homeBanner } = await useFetch("/api/cms/banner", {
  params: {
    category: 2,
    page_num: 1,
    page_size: 100,
    position: 2,
    language: 1,
  },
});
const { data: pageWorks } = await useFetch("/api/cms/pageWorker");

function toPaperWorker(id: number) {
  router.push({
    path: "/paper-worker/" + id,
  });
}
</script>

<template>
  <div class="home">
    <!-- Hero Banner -->
    <div class="home-banner">
      <ElCarousel autoplay height="auto" :interval="5000" class="home-carousel">
        <ElCarouselItem v-for="item in homeBanner.list">
          <img :src="getI18nData(item, 'image_url')" class="carousel-img" />
        </ElCarouselItem>
      </ElCarousel>
    </div>

    <!-- Module 1: Statistics -->
    <div class="home-section home-section--stats">
      <div class="home-section-header">
        <div class="section-title">
          {{ $t("pageData.home.module1.title") }}
        </div>
        <div class="section-description">
          {{ $t("pageData.home.module1.description") }}
        </div>
      </div>
      <div class="stats-grid">
        <div
          class="stat-card"
          v-for="(item, index) in decryptData(
            $t('pageData.home.module1.dataList')
          )"
        >
          <div class="stat-number">
            <span class="stat-number-value">{{ item.number }}</span>
            <span class="stat-number-plus">+</span>
          </div>
          <div class="stat-name">{{ item.name }}</div>
          <div class="stat-desc">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>

    <!-- Module 2: Expert Team / Paper Workers -->
    <div class="home-section home-section--team">
      <div class="home-section-header">
        <div class="section-title">
          {{ $t("pageData.home.module2.title") }}
        </div>
        <div class="section-subtitle">
          {{ $t("pageData.home.module2.description") }}
        </div>
      </div>
      <div class="team-grid">
        <div
          v-for="item in pageWorks.list"
          :key="item.id"
          class="team-card"
          @click="toPaperWorker(item.id)"
        >
          <div class="team-card-img-wrapper">
            <img
              class="team-card-img"
              :src="item.image"
            />
          </div>
          <div class="team-card-name">
            {{ item.name }}
          </div>
          <div class="team-card-intro">
            {{ getI18nData(item, "intro") }}
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-32 md:mt-40">
        <ElButton
          @click="toPaperWorker(pageWorks.list[0]?.id)"
          size="large"
          round
          class="cta-button"
        >
          {{ $t("pageData.home.module2.buttonText") || "查看全部" }}
        </ElButton>
      </div>
    </div>

    <!-- Module 3: Student Interview Video -->
    <div class="home-section home-section--video">
      <div class="home-section-header">
        <div class="section-title">
          {{ $t("pageData.home.module3.title") }}
        </div>
        <div class="section-subtitle">
          {{ $t("pageData.home.module3.description") }}
        </div>
      </div>
      <div class="video-wrapper">
        <VideoPlayer
          :poster="$t('pageData.home.module3.cover')"
          :src="$t('pageData.investorRelations.video')"
        ></VideoPlayer>
      </div>
    </div>

    <!-- Module 4: About Uoffer -->
    <div class="home-section home-section--about">
      <div class="about-content">
        <div class="about-text">
          <div class="section-title text-left">
            {{ $t("pageData.home.module4.title") }}
          </div>
          <div class="about-subtitle">
            {{ $t("pageData.home.module4.subTitle") }}
          </div>
          <div class="about-description">
            {{ $t("pageData.home.module4.subDescription") }}
          </div>
        </div>
        <div class="about-video">
          <VideoPlayer
            :poster="$t('pageData.home.module4.cover')"
            :src="$t('pageData.investorRelations.video')"
          ></VideoPlayer>
        </div>
      </div>
    </div>

    <!-- Module 5: Certifications -->
    <div class="home-section home-section--certs">
      <div class="home-section-header">
        <div class="section-title">{{ $t("pageData.home.module5.title") }}</div>
        <div class="section-subtitle">
          {{ $t("pageData.home.module5.description") }}
        </div>
      </div>
      <div class="certs-grid">
        <div
          v-for="(item, index) in decryptData(
            $t('pageData.home.module5.dataList')
          )"
          class="cert-card"
        >
          <div class="cert-card-img-wrapper">
            <img :src="item.img" class="cert-card-img" />
          </div>
          <div class="cert-card-text">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>

    <!-- Module 6: Bottom Banner -->
    <div class="home-section home-section--bottom">
      <img class="bottom-banner" :src="$t('pageData.home.module6.img')" />
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  background-color: #faf8ef;
  box-sizing: border-box;
  padding-bottom: 60px;

  @media (min-width: 768px) {
    padding-bottom: 88px;
  }
}

// ===== Hero Banner =====
.home-banner {
  width: 100%;

  .home-carousel {
    :deep(.el-carousel__container) {
      height: 50vw;
      max-height: 520px;
      min-height: 180px;

      @media (min-width: 768px) {
        height: 33vw;
      }
    }
  }

  .carousel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

// ===== Shared Section Styles =====
.home-section {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 36px;
  }

  &-header {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 48px;
    margin-bottom: 32px;

    @media (min-width: 768px) {
      margin-top: 80px;
      margin-bottom: 42px;
    }
  }
}

.section-title {
  text-align: center;
  font-weight: 600;
  font-size: 22px;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 28px;
  }

  @media (min-width: 1024px) {
    font-size: 32px;
  }
}

.section-description {
  margin-top: 16px;
  word-wrap: break-word;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 1.8;
  text-align: justify;
  color: #666;

  @media (min-width: 768px) {
    margin-top: 24px;
    font-size: 15px;
    line-height: 2;
    letter-spacing: 1px;
  }
}

.section-subtitle {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 1.8;
  text-align: center;
  color: #666;

  @media (min-width: 768px) {
    font-size: 15px;
    line-height: 2;
    letter-spacing: 1px;
  }
}

// ===== Section 1: Statistics =====
.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (min-width: 1024px) {
    gap: 24px;
  }
}

.stat-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
}

.stat-number {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;

  &-value {
    font-size: 36px;
    font-weight: 700;
    color: #5e4d00;
    line-height: 1;

    @media (min-width: 768px) {
      font-size: 42px;
    }
  }

  &-plus {
    font-size: 20px;
    font-weight: 600;
    color: #5e4d00;

    @media (min-width: 768px) {
      font-size: 26px;
    }
  }
}

.stat-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-top: 8px;

  @media (min-width: 768px) {
    font-size: 16px;
    margin-top: 12px;
  }
}

.stat-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin-top: 8px;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 14px;
    margin-top: 12px;
  }
}

// ===== Section 2: Team / Paper Workers =====
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
  }
}

.team-card {
  cursor: pointer;

  &-img-wrapper {
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 1;
  }

  &-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;

    .team-card:hover & {
      transform: scale(1.1);
    }
  }

  &-name {
    color: #333;
    font-weight: 600;
    font-size: 15px;
    margin-top: 12px;

    @media (min-width: 768px) {
      font-size: 18px;
    }
  }

  &-intro {
    color: #787878;
    font-size: 12px;
    line-height: 1.4;
    margin-top: 6px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (min-width: 768px) {
      font-size: 13px;
      margin-top: 8px;
    }
  }
}

// ===== Section 3: Video =====
.video-wrapper {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

// ===== Section 4: About =====
.home-section--about {
  background: linear-gradient(180deg, #faf8ef 0%, #f5f2e8 100%);
  padding-top: 40px;
  padding-bottom: 40px;

  @media (min-width: 768px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 48px;
  }
}

.about-text {
  flex: 1;
  min-width: 0;

  .section-title {
    text-align: left;
    font-size: 22px;

    @media (min-width: 768px) {
      font-size: 28px;
    }
  }
}

.about-subtitle {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-top: 12px;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 20px;
  }
}

.about-description {
  font-size: 13px;
  color: #666;
  line-height: 1.8;
  margin-top: 12px;
  text-align: justify;

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 2;
    margin-top: 16px;
  }
}

.about-video {
  flex: 0 0 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (min-width: 768px) {
    flex: 0 0 45%;
  }

  @media (min-width: 1024px) {
    flex: 0 0 40%;
  }
}

// ===== Section 5: Certifications =====
.certs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-width: 1100px;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
}

.cert-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px 12px;
  text-align: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  &-img-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &-img {
    max-width: 100%;
    height: auto;
    max-height: 80px;
    object-fit: contain;

    @media (min-width: 768px) {
      max-height: 100px;
    }
  }

  &-text {
    font-size: 12px;
    color: #666;
    font-weight: 600;
    line-height: 1.4;
    margin-top: 10px;
    text-align: center;
    white-space: pre-line;

    @media (min-width: 768px) {
      font-size: 14px;
      margin-top: 12px;
    }
  }
}

// ===== Section 6: Bottom Banner =====
.home-section--bottom {
  margin-top: 48px;

  @media (min-width: 768px) {
    margin-top: 80px;
  }
}

.bottom-banner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
}

// ===== CTA Button =====
.cta-button {
  :deep(.el-button) {
    padding: 12px 48px;
    font-size: 15px;
  }
}
</style>
