<template>
  <div class="company">
    <h3>{{ company.companyName }}</h3>
    <table>
      <tr>
        <th>Mėnesis</th>
        <th>Darbuotojų skaičius</th>
        <th>Vidutinis atlyginimas</th>
      </tr>

      <tr v-for="(month, index) in company.companyData" v-bind:key="index">
        <td>
          {{ month.month }}
        </td>
        <td>{{ month.numInsured }}</td>
        <td>{{ month.avgWage }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Company",
  props: { id: String },
  computed: {
    ...mapGetters({
      company: "data/getOneCompanyData",
    }),
  },
  methods: {
    ...mapActions({ getCompanyData: "data/getCompanyData" }),
  },
  created() {
    this.getCompanyData(this.id);
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
