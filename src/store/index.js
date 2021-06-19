import { createStore } from "vuex";

export default createStore({
  state: {
    popupShow: false,
  },
  getters: {
    getPopupShow: (state) => state.popupShow,
  },
  mutations: {
    SET_POPUP(state, payload) {
      state.popupShow = payload;
    },
  },
  actions: {
    HANDLE_POPUP({ commit }, payload) {
      commit("SET_POPUP", payload);
    },
  },
});
