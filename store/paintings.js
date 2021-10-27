/* eslint-disable require-await */
export const state = () => ({
    selectedPaitings:{}
})
  
export const mutations = {
    set(state, painting) {
      state.selectedPaitings = painting;
    }
}

export const actions = {
    async selected({ commit }, payload) {
      try {
        commit('set', payload);
        return payload;
      } catch (error) {
        commit('set', null);
      }
    }
}
  