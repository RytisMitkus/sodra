<template>
  <div class="register">
    <h3 class="login__greeting">Registruotis</h3>
    <form class="form">
      <div class="form-group">
        <label for="email" class="form-group__label"> El. paštas</label>
        <input
          class="form-group__input"
          type="email"
          id="email"
          v-model="email"
          placeholder="El. paštas"
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-group__label">Slaptažodis </label>
        <input
          class="form-group__input"
          type="password"
          id="password"
          placeholder="Slaptažodis"
          v-model="password"
        />
      </div>
      <button type="button" class="form-group__button" @click="registerUser">
        Prisijungti
      </button>
    </form>
    <p class="err" v-if="err">{{ err }}</p>
    <div class="login">
      <p>Turi paskyrą?</p>
      <router-link to="/login" class="login__link">Prisijunk</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
    ...mapActions({ register: "users/signUp" }),
    registerUser() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.register(user);
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 93vh;
  background-color: #f5f5f5;
  .login__greeting {
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 15vh;
  }
  .form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-group {
      margin-bottom: 1rem;
      width: 100%;
      max-width: 220px;
      .form-group__label {
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
      }
      .form-group__input {
        width: 100%;
        padding: 0.3rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 0.8rem;
        &:focus {
          outline: none;
          border-color: #000;
        }
      }
    }
    .form-group__button {
      color: #000;
      text-decoration: none;
      background-color: white;
      border: 1px solid #000;
      padding: 0.3rem 0.8rem;
      border-radius: 5px;
      margin-right: 0.5rem;
      cursor: pointer;
      font-size: 0.8rem;
      &:hover {
        color: #ffc107;
        background-color: #000;
      }
    }
  }
  .err {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
  .login {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 0.8rem;
      margin-right: 0.5rem;
    }
    .login__link {
      color: #000;
      text-decoration: none;
      font-size: 0.8rem;
      &:hover {
        color: #ffc107;
      }
    }
  }
}
</style>
