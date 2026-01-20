<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
}

.main-content {
  flex: 1;
}
</style>