<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<style>
@import url("./style.css");
body {
  margin: 0;
  padding: 0;
}
</style>
