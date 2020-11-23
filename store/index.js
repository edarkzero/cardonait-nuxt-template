export const state = () => ({
  users: [],
  user: {},
  token: {}
})

export const mutations = {
  removeUser (state, ids) {
    state.users = state.users.filter(function (user) {
      return !ids.includes(user.id)
    })
  },
  setUsers (state, users) {
    state.users = users
  },
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}

export const getters = {
  getUsers (state) {
    return state.users
  },
  getUser (state) {
    return state.user
  },
  getUserById: state => (id) => {
    if (typeof state.users.rows !== 'undefined') {
      return state.users.rows.find(user => user.id === id)
    } else {
      return state.user
    }
  }
}

export const actions = {
  async fetchUsers ({ commit }) {
    const usersData = await this.$api.$get('/api/users')
    if (typeof usersData.data.rows !== 'undefined') {
      commit('setUsers', usersData.data)
    }
  },
  async fetchUser ({ commit }, id) {
    const userData = await this.$api.$get('/api/users/' + id)
    if (typeof userData.data !== 'undefined') {
      commit('setUser', userData.data)
    }
  },
  async modifyUser ({ commit }, payload) {
    const formData = new FormData()
    for (const [key, value] of Object.entries(payload.data)) {
      formData.append(key, value)
    }
    const userData = await this.$api.$put('/api/users/' + payload.id, formData)
    if (typeof userData.data !== 'undefined') {
      commit('setUser', userData.data)
    }
  },
  async destroyUser ({ commit, state }, _ids) {
    await this.$api.$delete('/api/users/', { data: { ids: _ids } })
    if (typeof state.data !== 'undefined') {
      commit('removeUser', _ids)
    }
  },
  async fetchToken ({ commit }, payload) {
    const tokenData = await this.$axios.$get(payload.url)
    commit('setToken', tokenData)
  }
}
