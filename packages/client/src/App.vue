<template>
  <div id="nav">
    <router-link to="/login" v-if="this.$route.path == '/'"
      >Prisijungti
    </router-link>
    <button @click.prevent="logout" v-if="this.$route.path == '/dashboard'">
      Atsijungti
    </button>
  </div>
  <router-view />
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["setIsAuthenticated"]),
    logout() {
      this.setIsAuthenticated();
      axios.post("/api/users/logout");
      localStorage.removeItem("auth");
      this.$router.push("/");
    },
  },
  beforeMount() {
    this.$store.dispatch("data/getLatestData");
  },
};
</script>

<style lang="sass">
*
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  box-sizing: border-box
#nav
  display: flex
  justify-content: flex-end
  a
    color: #2c3e50
    text-decoration: none
    margin: 0 10px
    &:hover
      color: #3498db
    &.router-link-exact-active
      color: #42b983
  button
    background: none
    border: none
    color: #42b983
    font-size: 1.2em
    padding: 0
    &:hover
      cursor: pointer
    &:focus
      outline: none
</style>
