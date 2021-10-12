<template>
  <div class="company">
    <h1>{{ company.companyName }}</h1>
    <div class="company--view">
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
      <div class="comment--section--submitted">
        <div class="comment--section">
          <h3 class="comment--section__title">Komentarai</h3>

          <Tiptap v-if="isAuth" :jarCode="this.$route.params.id" />
          <div v-else>Prisijunkite, kad galėtumėte palikti komentarą</div>
        </div>
        <h4>Esami komentarai:</h4>
        <p v-if="!posts">Kol kas komentarų nėra</p>
        <div v-else class="submitted--comments">
          <div
            v-for="post in posts"
            class="comment--section--submitted__post"
            :key="post.id"
          >
            <div class="comment--section__metadata">
              <span
                >{{ post.created.split("T")[0] }} /
                {{ post.created.split("T")[1].split(".")[0] }}</span
              >
            </div>
            <p v-html="post.post"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Tiptap from "../components/Tiptap.vue";
import axios from "axios";

export default {
  components: { Tiptap },
  name: "Company",
  data() {
    return {
      posts: [],
    };
  },
  props: { id: String },
  computed: {
    ...mapGetters({
      company: "data/getOneCompanyData",
      isAuth: "users/isAuth",
    }),
  },
  methods: {
    ...mapActions({
      getCompanyData: "data/getCompanyData",
    }),
    async getCompanyPosts(jarCode) {
      const { data } = await axios.get(`/api/posts/companyposts/${jarCode}`, {
        withCredentials: true,
      });
      data.posts.forEach((post) => {
        post.post = post.post.replace(/<p[^>]*><\/p>/g, "<br>");
      });
      this.posts = data.posts;
    },
  },
  created() {
    this.getCompanyData(this.id);
  },
  beforeMount() {
    this.getCompanyPosts(this.id);
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
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    .comment--section {
      padding: 2rem 0;

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
  .submitted--comments {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(130px, auto);
    min-width: 1100px;

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(1, 1fr);
      width: 80%;
    }

    .comment--section--submitted__post {
      margin-bottom: 2rem;
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 5px;
      background-color: #fafafa;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      p {
        margin: 0;
        padding: 5px;
      }
      .comment--section__metadata {
        background-color: red;
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
