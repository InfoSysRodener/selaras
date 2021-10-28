/* eslint-disable require-await */
export const state = () => ({
    selectedPaintings:null
})
  

export const mutations = {
    set(state, painting) {
      state.selectedPaintings = painting;
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
  