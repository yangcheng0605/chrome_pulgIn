<template>
  <main class="wrapper">
    <router-view />
    <!-- <Test msg="Tank_plugin"/> -->
      <!-- <div id="shopify-section-home" class="shopify-section">
        <div class="homepage">
        </div>
      </div> -->
    </main>
</template>

<script>
import Test from '../test/Test.vue'

export default {
  name: 'App',
  components: {
    // Test
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
