<template>
  <div class="container">
    <h3>Registruotis</h3>
    <form>
      <div class="form-group">
        <label for="email">El. paštas</label>
        <input type="" v-model="email" placeholder="El. paštas" />
      </div>
      <div class="form-group">
        <label for="password">Slaptažodis </label>
        <input type="password" v-model="password" placeholder="Slaptažodis" />
      </div>
      <button class="btn-primary" @click.prevent="signUp">Registruotis</button>
    </form>
    <p class="err" v-if="err">{{ err }}</p>
    <div class="login">
      <p>Turi paskyrą?</p>
      <router-link to="/login">Prisijunk</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SingUp",
  data() {
    return {
      email: "",
      password: "",
      err: "",
    };
  },
  methods: {
    async signUp() {
      try {
        const { data } = await axios.post("/api/users", {
          withcredentials: true,
          email: this.email,
          password: this.password,
        });

        if (data.auth) {
          this.$router.push("/dashboard");
          localStorage.setItem("auth", true);
        }
      } catch (err) {
        this.err = err.response.data.message;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.container
  margin: 0 auto
  max-width: 400px
  padding: 20px

  a
    text-decoration: none
    &:hover
      text-decoration: underline
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
  .login
    width: 60%
    margin: 20px auto
    text-align: center
    color: gray
    font-size: 0.8rem
    display: flex
    align-items: center
    justify-content: space-around
</style>
