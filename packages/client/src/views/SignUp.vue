<template>
  <div class="register">
    <!-- form  -->
    <h3>Registracija</h3>
    <div class="form">
      <!-- name -->
      <div class="form--group">
        <label> Vardas</label>
        <input
          type="text"
          class="form__control"
          v-model="name"
          @blur="v$.name.$touch"
        />

        <!-- name error -->
        <div
          class="input__errors"
          v-for="(error, index) of v$.name.$errors"
          :key="index"
        >
          <div class="error__msg">{{ error.$message }}</div>
        </div>
      </div>
      <!-- last name -->
      <div class="form--group">
        <label> Pavardė</label>
        <input
          v-model="lastName"
          class="form__control"
          @blur="v$.lastName.$touch"
        />

        <!-- last name error  -->
        <div
          class="input__errors"
          v-for="(error, index) of v$.lastName.$errors"
          :key="index"
        >
          <div class="error__msg">{{ error.$message }}</div>
        </div>
      </div>
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
      <!-- confirm password  -->
      <div class="form--group">
        <label> Pakartokite slaptažodį</label>
        <input
          v-model="confirmPassword"
          class="form__control"
          @blur="v$.confirmPassword.$touch"
        />
        <div
          class="input__errors"
          v-for="(error, index) of v$.confirmPassword.$errors"
          :key="index"
        >
          <div class="error__msg">{{ error.$message }}</div>
        </div>
      </div>
      <button @click.prevent="submitForm">Registruotis</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  helpers,
  sameAs,
} from "@vuelidate/validators";

export default {
  name: "SingUp",
  setup() {
    return { v$: useVuelidate({ $lazy: true }) };
  },
  data() {
    return {
      name: "",
      requiredNameLength: 3,
      lastName: "",
      requiredLastNameLength: 4,
      email: "",
      requiredEmailLength: 6,
      password: "",
      requiredPasswordLength: 6,
      confirmPassword: "",
      requiredConfirmPasswordLength: 6,
      passwordMatch: false,
    };
  },
  validations() {
    return {
      name: {
        minLength: helpers.withMessage(
          `Vardas privalo būti bent ${this.requiredNameLength} raidžių ilgio`,
          minLength(this.requiredNameLength)
        ),
        required: helpers.withMessage(
          "Šis laukas privalo būti užpildytas",
          required
        ),
      },
      lastName: {
        minLength: helpers.withMessage(
          `Pavardė privalo būti bent ${this.requiredNameLength} raidžių ilgio`,
          minLength(this.requiredNameLength)
        ),
        required: helpers.withMessage(
          "Šis laukas privalo būti užpildytas",
          required
        ),
      },
      email: {
        email: helpers.withMessage("Įveskite teisingą el. pašto adresą", email),
        minLength: helpers.withMessage(
          `El. paštas privalo būti bent ${this.requiredEmailLength} simbolių ilgio`,
          minLength(this.requiredNameLength)
        ),
        required: helpers.withMessage(
          "Šis laukas privalo būti užpildytas",
          required
        ),
      },
      password: {
        required: helpers.withMessage(
          "Šis laukas privalo būti užpildytas",
          required
        ),
        minLength: helpers.withMessage(
          `Slaptažodis privalo būti bent ${this.requiredPasswordLength} simbolių ilgio`,
          minLength(this.requiredPasswordLength)
        ),
      },
      confirmPassword: {
        required: helpers.withMessage(
          "Šis laukas privalo būti užpildytas",
          required
        ),
        sameAsPassword: helpers.withMessage(
          "Slaptažodžiai nesutampa",
          sameAs(this.password)
        ),
      },
    };
  },
  methods: {
    ...mapActions({ register: "users/register" }),
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        const user = {
          email: this.email,
          name: this.name,
          lastName: this.lastName,
          password: this.password,
        };
        this.register(user);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 93vh;
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
      width: 100%;
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
}
</style>
