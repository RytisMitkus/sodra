<template>
  <div class="home">
    <h3>Duomenys nuo metų pradžios</h3>
    <table>
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

<style lang="sass" scoped>
.home
  padding: 20px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  table
    max-width: 600px
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
