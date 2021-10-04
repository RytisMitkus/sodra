<template>
  <div class="company">
    <h3>{{ company.companyName }}</h3>
    <div class="company--view">
      <div class="comment--section">
        <Tiptap :jarCode="this.$route.params.id" />
      </div>
      <table class="table">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Tiptap from "../components/Tiptap.vue";

export default {
  components: { Tiptap },
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

<style lang="scss" scoped>
.company {
  padding: 3vh 0;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 0.8rem;

  .company--view {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    .comment--section {
      padding-top: 2rem;
    }
  }

  .table {
    width: 100%;
    margin: 2rem 0;
    max-width: 800px;
    padding: 0 1rem;
    border-collapse: collapse;
    table-layout: fixed;
    th {
      font-weight: 200;
    }

    tr {
      border-bottom: 1px solid #ddd;
      td {
        word-wrap: break-word;
        padding: 0.5rem;
        text-align: center;
      }
    }
  }
}
</style>
