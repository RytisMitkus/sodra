import { createStore } from "vuex";
import dataModule from "./modules/dataModule";
import usersModule from "./modules/usersModule";

export default createStore({
  state: { isAuthenticated: JSON.parse(localStorage.getItem("auth")) },
  mutations: {
    setIsAuthenticated(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },
  },
  actions: {},
  getters: { isAuthenticated: (state) => state.isAuthenticated || false },
  modules: {
    data: dataModule,
    users: usersModule,
  },
});
