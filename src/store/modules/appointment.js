const state = {
    newAppointmentData: {}
};

const getters = {
    getAppointmentData: state => state.newAppointmentData,
};

const actions = {
    setAppointmentData({ commit }, data) {
        commit("APPOINTMENT_DATA", data);
    }
};

const mutations = {
    APPOINTMENT_DATA(state, data) {
        state.newAppointmentData = data
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
