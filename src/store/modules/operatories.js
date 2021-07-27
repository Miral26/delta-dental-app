const state = {
  rows: [
    {
      operatoryId: "1",
      name: "OP-1",
      description: "Hygiene 1 Nina",
      status: 'Active'
    },
    {
      operatoryId: "2",
      name: "OP-2",
      description: "Hygiene 1 Amanda",
      status: 'Active'
    },
    {
      operatoryId: "3",
      name: "OP-3",
      description: "Doctor Column 1 Carter",
      status: 'Active'
    },
    {
      operatoryId: "4",
      name: "OP-4",
      description: "Shared GP Column",
      status: 'Active'
    },
    {
      operatoryId: "5",
      name: "OP-5",
      description: "Doctor Column 2 Walker",
      status: 'Active'
    },
    {
      operatoryId: "6",
      name: "OtherOffice",
      description: "Patients seen at other",
      status: 'Active'
    },
    {
      operatoryId: "6",
      name: "THDC-ADMIN",
      description: "Administration",
      status: 'Active'
    }
  ],
  addOperatory: "",
};

const getters = {
  opratoryList: state => state.rows,
  getAddOperatory: state => state.addOperatory,
};

const actions = {
  addOperatory({ commit }, data) {
    commit("ADD_OPERATORY", data);
  },
};

const mutations = {
  ADD_OPERATORY(state, data) {
    state.rows.push(data);
    state.addOperatory = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
