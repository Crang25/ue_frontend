<template>
    <div class="container">
        <Header />
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '@/Header.vue'

export default {
    name: 'App',
    components: {
        Header,
    }
}
</script>

<style>
body {
  margin: 0 auto;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>