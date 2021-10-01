<template>
  <Header />
  <div class="router-view">
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
  beforeMount() {
    this.$store.dispatch("data/getLatestData");
  },
};
</script>

<style lang="sass">
*
  // overflow: hidden
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  box-sizing: border-box
  margin: 0
  padding: 0
  text-height: 0
.router-view
  padding-top: 7vh
</style>
