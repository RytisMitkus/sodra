<template>
  <div class="company">
    įmonė - {{ $route.params.name }}
    <table>
      <tr>
        <th>Mėnesis</th>
        <th>Darbuotojų skaičius</th>
        <th>Vidutinis atlyginimas</th>
      </tr>

      <tr v-for="(month, index) in company" v-bind:key="index">
        <td>{{ month.month }}</td>
        <td>{{ month.numInsured }}</td>
        <td>{{ month.avgWage }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      company: [],
    };
  },
  name: "Company",
  props: ["name", "jarCode"],
  computed: {},
  methods: {
    async fetchCompanyData() {
      if (!this.jarCode) return;
      const { data } = await axios.get(`/api/data/${this.jarCode}`);
      this.company = data;
    },
  },
  created() {
    this.fetchCompanyData();
  },
};
</script>

<style lang="sass" scoped>
.company
    padding: 20px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
table
    border-collapse: collapse
    tr
        border-bottom: 1px solid #ccc
    &:last-child
        border-bottom: none
    th
        padding: 10px
        text-align: center
    td
        padding: 10px
        text-align: center
        width: 20vw
</style>
