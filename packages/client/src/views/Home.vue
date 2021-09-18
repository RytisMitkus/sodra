<template>
  <div class="home">
    <table>
      <tr>
        <th>Company</th>
        <th>Code</th>
        <th>Employees</th>
        <th>Taxes</th>
      </tr>
      <tr v-for="(company, index) in companies" v-bind:key="index">
        <td>
          {{ company.name }}
        </td>
        <td>
          {{ company.jarCode }}
        </td>
        <td>
          {{ company.numInsured }}
        </td>
        <td>
          {{ company.taxes }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      companies: [],
    };
  },
  methods: {
    async getCompanies() {
      const companies = await axios.get("/api/data");
      this.companies = companies.data;
    },
  },
  beforeMount() {
    this.getCompanies();
  },
};
</script>

<style lang="sass" scoped>
.home
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
        text-align: left
      td
        padding: 10px
        text-align: left
</style>
