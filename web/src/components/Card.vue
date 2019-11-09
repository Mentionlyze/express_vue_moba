<template>
  <div class="card py-3 bg-white mt-3">
    <div class="card-header d-flex" :class="{ 'border-bottom': !plain, ' pb-3': !plain }">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">
        <strong>{{ title }}</strong>
      </div>
      <i class="iconfont icon-gengduo" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    plain: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.card {
  border-bottom: 1px solid $border-color;
}
</style>