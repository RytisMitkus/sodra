<template>
  <div class="company">
    <h1>{{ company.companyName }}</h1>
    <div class="company--view">
      <div class="comment--section">
        <h3 class="comment--section__title">Komentarai</h3>

        <Tiptap v-if="this.isAuthenticated" :jarCode="this.$route.params.id" />
        <div v-else>Prisijunkite, kad galėtumėte palikti komentarą</div>
        <div class="comment--section--submitted">
          <h4>Esami komentarai:</h4>
          <p>Kol kas komentarų nėra</p>
        </div>
      </div>
      <div class="table">
        <h3>Mėnesiniai duomenys</h3>
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
      isAuthenticated: "isAuthenticated",
    }),
  },
  methods: {
    ...mapActions({
      getCompanyData: "data/getCompanyData",
    }),
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
      .comment--section__title {
        margin-bottom: 2rem;
      }
      .comment--section--submitted {
        margin-top: 2rem;
      }
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
