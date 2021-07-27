export default {
    state: {
        cardAdded: null,
    },
    getters: {
        getCardAdded: (state) => state.cardAdded,
    },
    mutations: {
        ADD_CARD(state, data) {
            state.cardAdded = data;
        },
    },
    actions: {
        addCard({ commit }, data) {
            commit("ADD_CARD", data);
        },
    },
};
