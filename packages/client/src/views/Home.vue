<template>
  <div class="home">
    <h3>Year to date</h3>
    <table>
      <tr>
        <th>Company</th>
        <th>Code</th>
        <th>Employees</th>
        <th>Taxes</th>
        <th>Daugiau</th>
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
        <td>
          <button>
            <router-link
              :to="{
                name: 'company',
                params: { id: company.jarCode },
              }"
            >
              Daugiau info
            </router-link>
          </button>
          |
          <a :href="`${company.jobs}`" target="_blank">Karjera</a>
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
      const companies = await axios.get("/api/data", { withCredentials: true });
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
        text-align: center
      td
        padding: 10px
        text-align: center
        width: 20vw
        &:last-child
          width: 30vw
  h3
    font-size: 1.5em
  a
    color: #000
  &:hover
    color: #000
  button
    background-color: #fff
    border: none
    color: #fff
    padding: 10px
    border-radius: 5px
    cursor: pointer
    &:hover
      background-color: #fff
      color: #000
</style>
