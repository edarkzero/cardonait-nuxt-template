export const state = () => ({
  users: [],
  user: {},
  token: {},
  alertMessage: ''
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
  },
  setAlertMessage (state, alertMessage) {
    state.alertMessage = alertMessage + '...'
  }
}

export const getters = {
  getAlertMessage (state) {
    return state.alertMessage
  },
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
    commit('setAlertMessage', 'Fetching users')
    const usersData = await this.$api.$get('/api/users')
    if (typeof usersData.data.rows !== 'undefined') {
      commit('setUsers', usersData.data)
      commit('setAlertMessage', 'All users fetched')
    }
  },
  async fetchUser ({ commit }, id) {
    commit('setAlertMessage', 'Fetching user')
    const userData = await this.$api.$get('/api/users/' + id)
    if (typeof userData.data !== 'undefined') {
      commit('setUser', userData.data)
      commit('setAlertMessage', 'User fetched')
    }
  },
  async persistUser ({ commit }, data) {
    commit('setAlertMessage', 'Persisting user')
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value)
    }
    const userData = await this.$api.$post('/api/users', formData)
    if (typeof userData.data !== 'undefined') {
      commit('setUser', userData.data)
      commit('setAlertMessage', 'User persisted')
    }
  },
  async modifyUser ({ commit }, payload) {
    commit('setAlertMessage', 'Modifying user')
    const formData = new FormData()
    for (const [key, value] of Object.entries(payload.data)) {
      formData.append(key, value)
    }
    const userData = await this.$api.$put('/api/users/' + payload.id, formData)
    if (typeof userData.data !== 'undefined') {
      commit('setUser', userData.data)
      commit('setAlertMessage', 'User Modified')
    }
  },
  async destroyUser ({ commit, state }, _ids) {
    commit('setAlertMessage', 'Destroying user')
    await this.$api.$delete('/api/users/', { data: { ids: _ids } })
    if (typeof state.data !== 'undefined') {
      commit('removeUser', _ids)
      commit('setAlertMessage', 'User Destroyed')
    }
  },
  async fetchToken ({ commit }, payload) {
    commit('setAlertMessage', 'Fetching token')
    const tokenData = await this.$axios.$get(payload.url)
    commit('setToken', tokenData)
  }
}
