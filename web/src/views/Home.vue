<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in ads" :key="item._id">
        <img class="w-100" :src="item.image" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-2 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons text-center bg-white mt-3 pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="LC_icon_menu_line" title="新闻咨询" :categories="newsCats">
      <template #items="{category}">
        <router-link
          :to="`articles/${news._id}`"
          tag="div"
          class="py-2 fs-md d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2 text-xs">{{ news.title }}</span>
          <span class="text-grey-1">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="-superhero" title="英雄列表" :categories="heroList">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/hero/${hero._id}`"
            class="p-2 fs-xs text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <m-list-card icon="-superhero" title="赛事列表" :categories="heroList"></m-list-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      ads: [],
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      heroList: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/ads");
      this.ads = res.data[0].items;
    },
    async fetchNewsCats() {
      const res = await this.$http.get("/news/list");
      this.newsCats = res.data;
    },
    async fetchHeroList() {
      const res = await this.$http.get("/heroes/list");
      this.heroList = res.data;
    }
  },
  created() {
    this.fetch();
    this.fetchNewsCats();
    this.fetchHeroList();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 2px;
    background-color: map-get($map: $colors, $key: "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($map: $colors, $key: "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border: none;
    }
  }
}
</style>