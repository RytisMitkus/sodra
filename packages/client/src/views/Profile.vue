<template>
  Profilis

  <div>
    <div>
      <p>Vardas: {{ userData.name }}</p>
      <p>Pavardė: {{ userData.lastName }}</p>
      <p>El. paštas: {{ userData.email }}</p>
    </div>
    <router-link to="/news">Rašyti naujieną</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Profile",
  methods: {
    ...mapActions({ getUserData: "users/getUserData" }),
  },
  computed: {
    ...mapGetters({ userData: "users/userData" }),
  },

  beforeMount() {
    console.log("before mount");
    this.getUserData();
  },
};
</script>

<style></style>
