<template>
  <div class="login">
    <h3 class="login__greeting">Prisijungti</h3>
    <div class="form">
      <!-- email  -->
      <div class="form--group">
        <label> El. paštas</label>
        <input v-model="email" class="form__control" @blur="v$.email.$touch" />
        <div
          class="input__errors"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
        >
          <div class="error__msg">{{ error.$message }}</div>
        </div>
      </div>
      <!-- password  -->
      <div class="form--group">
        <label> Slaptažodis</label>
        <input
          v-model="password"
          class="form__control"
          @blur="v$.password.$touch"
        />

        <div
          class="input__errors"
          v-for="(error, index) of v$.password.$errors"
          :key="index"
        >
          <div class="error__msg">{{ error.$message }}</div>
        </div>
      </div>
      <button type="button" class="form-group__button" @click="loginUser">
        Prisijungti
      </button>
      <div class="register">
        <p>Neturi paskyros?</p>
        <router-link to="/register" class="register__link"
          >Registruotis</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "Login",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
        min: minLength(6),
      },
    };
  },
  methods: {
    ...mapActions({ login: "users/login" }),
    loginUser() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.login(user);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 97vh;
  h3 {
    margin-bottom: 20px;
    font-size: 2rem;
  }
  .form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .form--group {
      margin-bottom: 1rem;
      max-width: 200px;
    }
    .form--group:last-child {
      margin-bottom: 0;
    }

    .form__control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 12px;
      outline: none;
    }
    .form__control:focus {
      border: 1px solid #000;
    }
    .input__errors {
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .error__msg {
        color: red;
        font-size: 12px;
        margin-bottom: 0.2rem;
      }
    }
    button {
      width: 100%;
      max-width: 200px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      background-color: #000;
      color: #fff;
      cursor: pointer;
      outline: none;
      &:hover {
        color: #ffc107;
      }
    }
  }
  .register {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 0.8rem;
      margin-right: 0.5rem;
    }
    .register__link {
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
