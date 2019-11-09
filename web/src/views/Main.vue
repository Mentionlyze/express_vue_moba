<template>
  <div>
    <div class="topbar bg-black py-2 px-3 text-white d-flex ai-center">
      <img src="../assets/logo.png" height="35" />
      <div class="pl-3 flex-1">
        <div class="text-white">Express_vue_moba</div>
        <div class="text-grey-1 fs-xss">get more</div>
      </div>
      <button type="button" class="bg-primary btn">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav pb-1 nav-inverse jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>