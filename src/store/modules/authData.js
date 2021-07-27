import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  state: {
    loggedInUser:
      localStorage.getItem("userInfo") != null
        ? JSON.parse(localStorage.getItem("userInfo")).authenticatedUser
        : null,
    loading: false,
    error: null,
  },
  getters: {
    loggedInUser: (state) => state.loggedInUser,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
  mutations: {
    SET_USER(state, data) {
      state.loggedInUser = data;
    },
    setLogout(state) {
      state.loggedInUser = null;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, data) {
      state.loading = data;
      state.error = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    setUser({ commit }, data) {
      commit("SET_USER", data);
    },
    getUser({ commit }) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (userInfo.access && userInfo.refresh) {
        commit("SET_USER", userInfo);
        axios.defaults.headers.common["Authorization"] =
          "JWT " + userInfo.access;
      }
    },
    login({ commit }, data) {
      axios
        .post("auth/login/", data)
        .then((response) => console.log("resp: ", response))
        .catch((error) => console.log("error: ", error.response));
    },
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("userInfo");
          commit("setLogout");
        });
    },
  },
};
