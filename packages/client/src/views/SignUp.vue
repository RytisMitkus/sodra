<template>
  <div class="container">
    <h3>Registruotis</h3>
    <form>
      <div class="form-group">
        <label for="email">El. paštas</label>
        <input type="" v-model="email" placeholder="Email" />
      </div>
      <div class="form-group">
        <label for="password">Slaptažodis </label>
        <input type="password" v-model="password" placeholder="Password" />
      </div>
      <button @click.prevent="signUp">Sign Up</button>
    </form>
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
    };
  },
  methods: {
    async signUp() {
      const { data } = await axios.post("/api/users", {
        withcredentials: true,
        email: this.email,
        password: this.password,
      });

      if (data.auth) {
        this.$router.push("/dashboard");
        localStorage.setItem("auth", true);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 100%

  h3
    font-size: 1.5em
    margin-bottom: 0.5em
  form
    margin-bottom: 1em
    .form-group
      label
        font-size: 1em
        display: block
        margin-bottom: 0.5em
      input
        display: block
        width: 100%
        border: 1px solid #ccc
        border-radius: 3px
        padding: 0.5em
        font-size: 1em
        &:focus
          outline: none
          border-color: #000
          box-shadow: 0 0 5px #000
  button
    margin-top: 1em
    display: block
    width: 100%
    border: 1px solid #ccc
    border-radius: 3px
    padding: 0.5em
    font-size: 1em
    background: #ccc
    &:focus
      outline: none
      border-color: #000
      box-shadow: 0 0 5px #000
</style>
