<template>
  <div class="header">
    <div class="logo">
      <h3 class="logo--item">
        <router-link class="logo--item__item" to="/">
          Unicorns News
        </router-link>
      </h3>
    </div>
    <div class="header--item">
      <router-link class="router__link" to="/login" v-if="!isAuth">
        Prisijungti
      </router-link>
      <router-link class="router__link" to="/profile" v-if="isAuth">
        Paskyra
      </router-link>
      <button @click.prevent="logout" class="logout__button" v-if="isAuth">
        Atsijungti
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Header",
  methods: {
    ...mapMutations({ setAuth: "users/SET_AUTH" }),
    logout() {
      this.setAuth();
      axios.post("/api/users/logout");
      localStorage.removeItem("auth");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters({ isAuth: "users/isAuth" }),
  },
};
</script>

<style lang="scss" scoped>
.header {
  z-index: 9999;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #000;
  color: #fff;
  .logo--item {
    .logo--item__item {
      color: #fff;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
      &:hover {
        color: #ffc107;
      }
    }
  }
  .header--item {
    display: flex;
    align-items: center;
    .router__link {
      color: #fff;
      text-decoration: none;
      font-size: 0.8rem;
      &:hover {
        color: #ffc107;
      }
    }
    .logout__button {
      background-color: transparent;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      cursor: pointer;
      &:hover {
        background-color: #000;
        color: #ffc107;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .header {
    padding: 0 0.5rem;
  }
}
</style>
