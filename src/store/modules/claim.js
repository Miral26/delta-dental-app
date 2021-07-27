import axios from "axios";

const state = {
  claims: {
    pending: [],
    completed: [],
    inProgress: [],
  },

  claimAdded: null,
  claimUpdated: null,
  claimDeleted: null,
  statusUpdated: null,

  payments: {
    pending: [],
    completed: [],
    overDue: [],
    refunded: [],
  },

  selectedTab: "inProgress",
  selectedRecord: null,

  errors: null,
  cardCharged: null,
  reminderSent: null,
  loading: false,
};

const getters = {
  getClaims: (state) => state.claims[state.selectedTab],
  getClaimAdded: (state) => state.claimAdded,
  getClaimUpdated: (state) => state.claimUpdated,
  getClaimDeleted: (state) => state.claimDeleted,
  getStatusUpdated: (state) => state.statusUpdated,

  getPayments: (state) => state.payments[state.selectedTab],
  getSelectedTab: (state) => state.selectedTab,
  getSelectedRecord: (state) => state.selectedRecord,

  errors: (state) => state.errors,
  cardCharged: (state) => state.cardCharged,
  reminderSent: (state) => state.reminderSent,
  getLoading: (state) => state.loading,
};

const actions = {
  fetchClaims({ commit }, data) {
    axios
      .get(`insurance-claims/?location_id=${data}&claims=all`)
      .then((response) => {
        if (!response.data.count) {
          return commit("SET_CLAIMS", {
            pending: [],
            completed: [],
          });
        }

        let results = response.data.results;
        let list = { pending: [], completed: [], inProgress: [] };

        list.pending = results.filter((r) => r.claim_status === "PENDING");
        list.completed = results.filter((r) => r.claim_status === "COMPLETED");
        list.inProgress = results.filter(
          (r) => r.claim_status === "In-Progress"
        );

        commit("SET_CLAIMS", list);
      })
      .catch((error) => {
        console.log("Error fetching claims: ", error.response);
      });
  },
  createClaim({ commit }, data) {
    commit("SET_LOADING", true);

    axios
      .post("insurance-claims/", data)
      .then((response) => {
        commit("CLAIM_ADDED", response.data);
      })
      .catch((error) => {
        commit("ADD_ERRORS", {
          message: "Please fill the form correctly!",
        });
      });
  },
  updateClaim({ commit }, data) {
    commit("SET_LOADING", true);

    axios
      .put(`insurance-claims/${data.id}/`, data)
      .then((response) => {
        commit("CLAIM_UPDATED", response.data);
      })
      .catch((error) => {
        commit("ADD_ERRORS", {
          message: "Please fill the form correctly!",
        });
      });
  },
  updateStatus({ commit }, data) {
    axios
      .patch(`insurance-claims/${data.id}/status/`, data)
      .then((response) => {
        commit("STATUS_UPDATED", data);
      })
      .catch((error) => {
        commit("ADD_ERRORS", {
          message: "Error changing status!",
        });
      });
  },
  removeClaim({ commit }, data) {
    commit("SET_LOADING", true);

    axios
      .delete(`insurance-claims/${data.id}/`)
      .then((response) => {
        if (response && response.status === 204)
          commit("CLAIM_DELETED", data.id);
      })
      .catch((error) => {
        commit("ADD_ERRORS", {
          message: "Please fill the form correctly!",
        });
      });
  },

  fetchPayments({ commit }, data) {
    axios
      .get(`insurance-claims/?location_id=${data}&payments=all`)
      .then((response) => {
        if (!response.data.count) {
          return commit("SET_PAYMENTS", {
            pending: [],
            completed: [],
            overDue: [],
          });
        }

        let results = response.data.results;
        let list = { pending: [], completed: [], overDue: [] };

        list.pending = results.filter(
          (r) =>
            ["PENDING", "In-Progress"].includes(r.payment_status) && !r.failed
        );
        list.completed = results.filter(
          (r) => r.payment_status === "COMPLETED" && !r.failed
        );
        list.refunded = results.filter(
          (r) => r.payment_status === "REFUNDED" && !r.failed
        );
        list.overDue = results.filter((r) => r.failed);

        // list.pending = results.filter(
        //   (r) =>
        //     r.status === "COMPLETED" &&
        //     !r.charge &&
        //     !FAILED_PAYMENTS_STATUSES.includes(r.invoice_status)
        // );
        // list.completed = results.filter(
        //   (r) =>
        //     r.status === "COMPLETED" &&
        //     r.charge &&
        //     !FAILED_PAYMENTS_STATUSES.includes(r.invoice_status)
        // );
        // list.overDue = results.filter((r) =>
        //   FAILED_PAYMENTS_STATUSES.includes(r.invoice_status)
        // );

        commit("SET_PAYMENTS", list);
      })
      .catch((error) => {
        console.log("Error fetching claims. ", error);
      });
  },
  remindPatient({ commit }, data) {
    axios
      .get(`insurance-claims/${data.id}/invoice-generate/`)
      .then((response) => {
        console.log(response.data);
        commit("REMINDER_SENT", response.data);
      })
      .catch((error) => {
        // console.log("Error Generating Invoice: ", error.response);
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 503)
        ) {
          commit("ADD_ERRORS", error.response.data);
        }
      });
  },
  setTab({ commit }, data) {
    commit("SET_TAB", data);
  },
  setRecord({ commit }, data) {
    commit("SET_RECORD", data);
  },
  chargeNow({ commit }, data) {
    axios
      .get(`insurance-claims/${data.id}/charge/`)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) commit("CARD_CHARGED", response.data);
      })
      .catch((error) => {
        // console.log('err: ', error.response);
        if (
          (error.response && error.response.status === 400) ||
          error.response.status === 503
        ) {
          commit("ADD_ERRORS", error.response.data);
        }
      });
  },
  saveCard({ commit }, data) {
    commit("SAVE_CARD", data);
  },
  removeCard({ commit }, data) {
    commit("REMOVE_CARD", data);
  },
};

const mutations = {
  SET_CLAIMS(state, data) {
    state.claims = data;
  },
  CLAIM_ADDED(state, data) {
    if (data.claim_status === "In-Progress") {
      state.claims["inProgress"].push(data);
    } else {
      state.claims[data.status.toLowerCase()].push(data);
    }

    state.claimAdded = data.id;
    state.loading = false;
  },
  CLAIM_UPDATED(state, data) {
    // remove claim from previous lists
    state.claims["pending"] = state.claims["pending"].filter(
      (c) => c.id !== data.id
    );
    state.claims["completed"] = state.claims["completed"].filter(
      (c) => c.id !== data.id
    );
    state.claims["inProgress"] = state.claims["inProgress"].filter(
      (c) => c.id !== data.id
    );

    // add claim into list
    if (data.claim_status === "In-Progress") {
      state.claims["inProgress"].push(data);
    } else {
      state.claims[data.status.toLowerCase()].push(data);
    }
    state.claimUpdated = new Date();
    state.loading = false;
  },
  STATUS_UPDATED(state, data) {
    // remove claim from previous lists
    state.claims["pending"] = state.claims["pending"].filter(
      (c) => c.id !== data.id
    );
    state.claims["completed"] = state.claims["completed"].filter(
      (c) => c.id !== data.id
    );
    state.claims["inProgress"] = state.claims["inProgress"].filter(
      (c) => c.id !== data.id
    );

    let newData = {...state.selectedRecord, status: data.status};

    // add claim into list
    if (newData.claim_status === "In-Progress") {
      state.claims["inProgress"].push(newData);
    } else {
      state.claims[newData.status.toLowerCase()].push(newData);
    }
    state.statusUpdated = new Date();
  },
  CLAIM_DELETED(state, data) {
    state.claims["pending"] = state.claims["pending"].filter(
      (c) => c.id !== data
    );
    state.claims["completed"] = state.claims["completed"].filter(
      (c) => c.id !== data
    );
    state.claims["inProgress"] = state.claims["inProgress"].filter(
      (c) => c.id !== data
    );

    state.claimDeleted = data;
    state.loading = false;
  },
  SET_PAYMENTS(state, data) {
    state.payments = data;
  },
  ADD_ERRORS(state, data) {
    state.errors = data;
    state.loading = false;
  },
  SET_TAB(state, data) {
    state.selectedTab = data;
  },
  SET_RECORD(state, data) {
    state.selectedRecord = data;
  },
  SAVE_CARD(state, data) {
    if (state.selectedTab !== "" && state.selectedRecord) {
      const findRow = state.rows[state.selectedTab].find(
        ({ id }) => id === state.selectedRecord.id
      );
      if (findRow) {
        findRow.customer_card.push({
          ...data,
          id: findRow.customer_card && findRow.customer_card.length + 1,
          card_brand: "VISA",
        });
      }
    }
  },
  REMOVE_CARD(state, data) {
    if (state.selectedTab !== "" && state.selectedRecord) {
      const findRowIndex = state.rows[state.selectedTab].findIndex(
        ({ id }) => id === state.selectedRecord.id
      );
      if (findRowIndex > -1) {
        const findCardIndex = state.rows[state.selectedTab][
          findRowIndex
        ].customer_card.findIndex(({ id }) => id === data.id);
        if (findCardIndex > -1) {
          state.rows[state.selectedTab][findRowIndex].customer_card.splice(
            findCardIndex,
            1
          );
          state.selectedRecord = state.rows[state.selectedTab][findRowIndex];
        }
      }
    }
  },
  CARD_CHARGED(state, data) {
    state.cardCharged = data;
  },
  REMINDER_SENT(state, data) {
    state.reminderSent = data;
  },
  SET_LOADING(state, data) {
    state.loading = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
