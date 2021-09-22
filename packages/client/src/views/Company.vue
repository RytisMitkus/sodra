<template>
  <div class="company">
    <h3>{{ companyName }}</h3>
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
      companyName: "",
    };
  },
  name: "Company",
  props: { id: String },
  computed: {},
  methods: {
    async fetchCompanyData() {
      if (!this.id) return;
      const { data } = await axios.get(`/api/data/${this.id}`);
      const { companyData, companyName } = data;
      this.companyName = companyName[0].name;
      this.company = companyData;
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
