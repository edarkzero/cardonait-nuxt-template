<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">
        CardonaIT
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">
            Me
          </b-nav-item>
          <b-nav-item to="/about">
            About
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="info"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{ alertMessage }}</p>
      <b-progress
        variant="info"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      />
    </b-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Menu',
  data () {
    return {
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  computed: {
    ...mapGetters({
      alertMessage: 'getAlertMessage'
    })
  },
  watch: {
    alertMessage () {
      this.showAlert()
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style scoped>

</style>
