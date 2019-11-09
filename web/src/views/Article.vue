<template>
  <div class="page-article">
    <div class="d-flex py-3 px-2 border-bottom">
      <i class="iconfont icon-back text-blue" @click="$router.back()"></i>
      <strong class="flex-1 text-info text-ellipsis">{{ article.title }}</strong>
      <div class="text-grey fs-sm">{{ article.createdAt | date }}</div>
    </div>
    <div v-html="article.content" class="px-3 body fs-lg"></div>
    <div class="px-3 py-2 border-top">
      <div class="d-flex ai-center">
        <i class="iconfont icon-news"></i>
        <strong class="text-blue fs-xs ml-1">相关咨询</strong>
      </div>
      <div class="pt-2">
        <router-link
          class="py-2 text-ellipsis"
          style="width: 100%"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in article.related"
          :key="item._id"
        >{{ item.title }}</router-link>
      </div>
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
      article: {}
    };
  },
  watch: {
    id() {
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.article = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
