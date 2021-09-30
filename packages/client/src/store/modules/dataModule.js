import axios from "axios";

const state = {
  latestData: {},
};
const mutations = {
  SET_LATEST_DATA(state, data) {
    state.latestData = data;
  },
};
const actions = {
  async getLatestData(context) {
    const companies = await axios.get("/api/data", { withCredentials: true });
    context.commit("SET_LATEST_DATA", companies.data);
  },
};
const getters = {
  getLatestData(state) {
    return state.latestData;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
