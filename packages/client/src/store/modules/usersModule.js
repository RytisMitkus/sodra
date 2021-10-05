import axios from "axios";
import router from "../../router";
const state = {
  auth: false,
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
};
const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
