import axios from "axios";
import router from "../../router";
const state = {
  auth: JSON.parse(localStorage.getItem("auth")) || null,
  err: "",
};
const mutations = {
  SET_AUTH(state) {
    state.auth = !state.auth;
  },
};
const actions = {
  async login(context, user) {
    try {
      const { data } = await axios.post("/api/users/login", {
        withcredentials: true,
        user,
      });
      if (data && data.auth) localStorage.setItem("auth", true);
      context.commit("SET_AUTH");
      router.push("/");
    } catch (err) {
      this.err = err.response.data.message;
    }
  },
  async signUp(context, user) {
    try {
      const { data } = await axios.post("/api/users", {
        withcredentials: true,
        user,
      });

      if (data.auth) {
        router.push("/");
        localStorage.setItem("auth", true);
        context.commit("SET_AUTH");
      }
    } catch (err) {
      this.err = err.response.data.message;
    }
  },
};
const getters = {
  isAuth: (state) => state.auth,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
