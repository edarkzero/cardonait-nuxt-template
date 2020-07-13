export default async function ({ $axios, store }, inject) {
  // Create a custom axios instance
  const api = $axios.create()
  const endpoint = 'https://gateway-dev-dot-cardonait.uc.r.appspot.com'

  // Set baseURL to something different
  api.setBaseURL(endpoint)

  // Fetch token if is needed
  if (typeof store.state.token.token === 'undefined') {
    await store.dispatch('fetchToken', { url: endpoint + '/token' })
  }

  api.setToken(store.state.token.token)

  // Inject to context as $api
  inject('api', api)
}
