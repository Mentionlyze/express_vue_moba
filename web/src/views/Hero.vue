<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 text-white d-flex ai-center">
      <img src="../assets/logo.png" height="35" />
      <div class="pl-3 flex-1">
        <span class="text-white">Express_vue</span>
        <span class="ml-2">get more</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{ backgroundImage: `url(${model.banner})` }">
      <div class="info text-white p-3 d-flex flex-column jc-end h-100">
        <div class="fs-sm">{{ model.title }}</div>
        <h3 class="my-2">{{ model.name }}</h3>
        <div class="fs-sm" v-if="model.categories">{{ model.categories.map(v => v.name).join('/') }}</div>
        <div class="d-flex jc-between">
          <div class="scores fs-sm d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="div" class="text-grey fs-sm">皮肤 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div class="bg-white px-3">
      <div class="nav d-flex pt-2 pb-2 jc-around border-bottom">
        <div class="nav-item active">
          <div class="nav-link">英雄初识</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">进阶功率</div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="py-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon--superhero"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon--superhero"></i>
                  英雄介绍视频
                </router-link>
              </div>

              <!-- skills -->
              <div class="skills bg-white mt-4" v-if="model.skills.length">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    :class="{active: currentSkillIndex === i}"
                    :src="item.icon"
                    v-for="(item, i) in model.skills"
                    :key="i"
                    width="60"
                    height="60"
                    @click="() => currentSkillIndex = i"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h4 class="m-0">{{ currentSkill.name }}</h4>
                    <span
                      class="text-grey-1 ml-4"
                    >(冷却值：{{ currentSkill.delay }} 消耗：{{ currentSkill.cost }})</span>
                  </div>
                  <p>{{ currentSkill.description }}</p>
                  <div class="border-bottom"></div>
                  <p class="text-grey">{{ currentSkill.tips }}</p>
                </div>
              </div>
            </div>
            <m-card plain icon="-superhero" title="出装推荐" class="hero-items">
              <div class="fs-md">顺风出装</div>
              <div class="d-flex jc-around text-center my-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{ item.name }}</div>
                </div>
              </div>
              <div class="border-bottom"></div>
              <div class="fs-md mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon" />
                  <div class="fs-xs">{{ item.name }}</div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="-superhero" title="使用技巧">
              <p class="m-0">{{ model.usageTips }}</p>
            </m-card>
            <m-card icon="-superhero" title="对抗技巧">
              <p class="m-0">{{ model.battleTips }}</p>
            </m-card>
            <m-card icon="-superhero" title="团战思路">
              <p class="m-0">{{ model.teamTips }}</p>
            </m-card>
            <m-card plain icon="-superhero" title="英雄关系" v-if="model.partners">
              <div class="fs-md">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name">
                <div class="d-flex pt-3">
                  <img :src="item.hero.avatar" height="50" />
                  <p class="m-0 ml-3 flex-1 fs-xs">{{ item.description }}</p>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      model: {
        scores: [],
        skills: []
      },
      currentSkillIndex: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`hero/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skills {
    img.icon {
      border: 3px solid map-get($map: $colors, $key: "white");
      &.active {
        border-color: map-get($map: $colors, $key: "primary");
        border-radius: 50%;
      }
    }
  }
  .hero-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>