<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
