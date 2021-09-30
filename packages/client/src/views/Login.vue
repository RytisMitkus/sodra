<template>
  <div class="container">
    <h3>Prisijunk</h3>
    <form>
      <div class="form-group">
        <label for="email"> El. paštas</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="El. paštas"
        />
      </div>
      <div class="form-group">
        <label for="password">Slaptažodis </label>
        <input
          type="password"
          id="password"
          placeholder="Slaptažodis"
          v-model="password"
        />
      </div>
      <button type="button" class="btn btn-primary" @click="login">
        Prisijungti
      </button>
    </form>
    <p class="err" v-if="err">{{ err }}</p>
    <div class="register">
      <p>Neturi paskyros?</p>
      <router-link to="/register">Registruotis</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      err: "",
    };
  },
  methods: {
    ...mapMutations(["setIsAuthenticated"]),
    async login() {
      try {
        const { data } = await axios.post("/api/users/login", {
          withcredentials: true,
          email: this.email,
          password: this.password,
        });
        if (data && data.auth) localStorage.setItem("auth", true);
        this.setIsAuthenticated();
        this.$router.push({
          name: "Dashboard",
        });
      } catch (err) {
        this.err = err.response.data.message;
      }
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
  .err
    color: red
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
