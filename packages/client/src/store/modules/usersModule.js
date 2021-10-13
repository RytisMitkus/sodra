import axios from "axios";
import router from "../../router";
const state = {
  auth: JSON.parse(localStorage.getItem("auth")) || null,
  userData: [],
  err: "",
};
const mutations = {
  SET_AUTH(state) {
    state.auth = !state.auth;
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
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
  async register(context, user) {
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
  async getUserData(context) {
    try {
      const { data } = await axios.get("/api/users/profile", {
        withcredentials: true,
      });
      console.log(data);

      context.commit("SET_USER_DATA", data);
    } catch (err) {
      this.err = err.response.data.message;
    }
  },
};
const getters = {
  isAuth: (state) => state.auth,
  userData: (state) => state.userData,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
