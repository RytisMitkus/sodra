import axios from "axios";

const state = {
  latestData: {},
  company: { companyData: {}, companyName: "" },
};
const mutations = {
  SET_LATEST_DATA(state, data) {
    state.latestData = data;
  },
  SET_COMPANY_DATA(state, { companyData, companyName }) {
    state.company.companyData = companyData;
    state.company.companyName = companyName;
  },
};
const actions = {
  async getLatestData(context) {
    const companies = await axios.get("/api/data", { withCredentials: true });
    context.commit("SET_LATEST_DATA", companies.data);
  },
  async getCompanyData(context, id) {
    const { data } = await axios.get(`/api/data/${id}`);
    let { companyData, companyName } = data;
    companyName = companyName[0].name;
    context.commit("SET_COMPANY_DATA", { companyData, companyName });
  },
};
const getters = {
  getLatestData(state) {
    return state.latestData;
  },
  getOneCompanyData(state) {
    return state.company;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
