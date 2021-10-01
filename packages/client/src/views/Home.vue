<template>
  <div class="home">
    <h3>Duomenys nuo metų pradžios</h3>
    <table class="table">
      <tr>
        <th>
          Įmonė
          <i
            @click.prevent="data.sort(dynamicSort(name))"
            style="font-size: 0.8rem"
            class="fas fa-sort"
          ></i>
        </th>
        <th>
          Darbuotojai
          <i
            @click.prevent="data.sort(dynamicSort(numInsured))"
            style="font-size: 0.8rem"
            class="fas fa-sort"
          ></i>
        </th>
        <th>
          Mokesčiai
          <i
            @click.prevent="data.sort(dynamicSort(taxes))"
            style="font-size: 0.8rem"
            class="fas fa-sort"
          ></i>
        </th>
        <th>Daugiau</th>
      </tr>
      <tr v-for="(company, index) in data" v-bind:key="index">
        <td>
          {{ company.name }}
        </td>
        <td>
          {{ company.numInsured + company.numInsured2 }}
        </td>
        <td>
          {{ company.taxes }}
        </td>
        <td>
          <button>
            <router-link
              class="table__link"
              :to="{
                name: 'company',
                params: { id: company.jarCode },
              }"
            >
              Daugiau info
            </router-link>
          </button>
          |
          <a class="table__link" :href="`${company.jobs}`" target="_blank"
            >Karjera</a
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      taxes: "taxes",
      numInsured: "-numInsured",
      name: "-name",
    };
  },
  methods: {
    //needs refactoring
    dynamicSort(property) {
      property === "taxes" ? (this.taxes = "-taxes") : (this.taxes = "taxes");
      property === "numInsured"
        ? (this.numInsured = "-numInsured")
        : (this.numInsured = "numInsured");
      property === "name" ? (this.name = "-name") : (this.name = "name");
      let sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return (a, b) => {
        let result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },
  },
  computed: {
    ...mapGetters({
      data: "data/getLatestData",
    }),
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.home {
  padding-top: 7vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .table {
    width: 100%;
    margin: 2rem 0;
    max-width: 1100px;
    padding: 0 1rem;
    border-collapse: collapse;
    table-layout: fixed;
    tr {
      border-bottom: 1px solid #ddd;
      td {
        padding: 0.5rem;
        text-align: center;
      }
    }
  }
}
</style>
