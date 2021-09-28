<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="email"> </label>El. paštas
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password"> </label>Slaptažodis
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="button" class="btn btn-primary" @click="login">
        Prisijungti
      </button>
    </form>
    <div class="register">
      <p>Neturi paskyros?</p>
      <router-link to="/register">Registruotis</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const { data } = await axios.post("/api/users/login", {
        email: this.email,
        password: this.password,
      });
      if (data.auth) localStorage.setItem("auth", true);
      this.$router.push({
        name: "Dashboard",
      });
    },
  },
};
</script>

<style lang="sass" scoped>
// suggest styling for Login component
.container

  margin: 0 auto
  max-width: 400px
  padding: 20px
  .form-group
    width: 100%
    margin-bottom: 20px
    label
      display: block
      margin-bottom: 5px
      font-weight: bold
    input
      width: 100%
      border: 1px solid #ccc
      border-radius: 3px
      padding: 5px
      &:focus
        outline: none
        border-color: #999
  button
    margin-top: 20px
    width: 100%
    border: none
    border-radius: 3px
    padding: 5px
    font-weight: bold
    &:focus
      outline: none
      border-color: #999

  .btn-primary
    background-color: #00a8ff
    color: #fff
    &:hover

      background-color: #00a8ff
      color: #fff
    &:focus
      outline: none
      border-color: #999

  .register
    width: 60%
    margin: 20px auto
    text-align: center
    color: gray
    font-size: 0.8rem
    display: flex
    align-items: center
    justify-content: space-around
  a
    text-decoration: none
    &:hover
      text-decoration: underline
</style>
