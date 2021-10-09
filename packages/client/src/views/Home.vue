<template>
  <div class="home">
    <h3>Duomenys nuo metų pradžios</h3>
    <div class="search">
      <label>
        Ieškoti pagal pavadinimą:
        <input class="search__input-element" type="text" v-model="searchTerm" />
      </label>
      <span v-if="searchTerm != 0">Rasta: {{ data.length }}</span>
    </div>
    <table class="table">
      <tr>
        <th>
          Įmonė
          <i
            @click.prevent="data.sort(dynamicSort(name))"
            style="font-size: 0.6rem"
            class="fas fa-sort"
          ></i>
        </th>
        <th>
          Darbuotojų
          <i
            @click.prevent="data.sort(dynamicSort(numInsured))"
            style="font-size: 0.6rem"
            class="fas fa-sort"
          ></i>
        </th>
        <th>
          Mokesčiai
          <i
            @click.prevent="data.sort(dynamicSort(taxes))"
            style="font-size: 0.6rem"
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
          <router-link
            class="table__link"
            :to="{
              name: 'company',
              params: { id: company.jarCode },
            }"
          >
            Daugiau
          </router-link>
          <a class="table__link" :href="`${company.jobs}`" target="_blank"
            >Karjera</a
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      taxes: "taxes",
      numInsured: "-numInsured",
      name: "-name",
      searchTerm: "",
    };
  },
  methods: {
    ...mapMutations({
      filterCompanyData: "data/FILTER_COMPANY_DATA",
    }),
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
  watch: {
    searchTerm(val) {
      this.filterCompanyData(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  label {
    display: flex;
    width: 100%;
    max-width: 275px;
    align-items: center;
    flex-direction: column;
    .search__input-element {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
      outline: none;
    }
  }
}

@media (max-width: 1100px) {
  .search {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    label {
      width: 100%;
      max-width: 80%;
      margin-bottom: 0.5rem;
    }
  }
}
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
  font-size: 0.8rem;

  .table {
    width: 100%;
    margin: 2rem 0;
    max-width: 1100px;
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
.table__link {
  color: #000;
  text-decoration: none;
  background-color: white;
  border: 1px solid #000;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    color: #ffc107;
    background-color: #000;
  }
}
@media (max-width: 768px) {
  .table {
    th:nth-child(1) {
      width: 100px;
    }
    th:nth-child(2) {
      width: 90px;
    }
    th:nth-child(3) {
      width: 75px;
    }
    .table__link {
      display: block;
      margin: 0.5rem 0;
    }
  }
}
</style>
