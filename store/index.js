export const state = () => ({
  users: [],
  token: {}
})

export const mutations = {
  setUsers (state, users) {
    state.users = users
  },
  setToken (state, token) {
    state.token = token
  }
}

export const getters = {
  getUsers (state) {
    return state.users
  }
}

export const actions = {
  async fetchUsers ({ commit }) {
    const usersData = await this.$api.$get('/api/users')
    if (typeof usersData.data.rows !== 'undefined') {
      commit('setUsers', usersData.data)
    }
  },
  async fetchToken ({ commit }, payload) {
    const tokenData = await this.$axios.$get(payload.url)
    commit('setToken', tokenData)
  }
}
