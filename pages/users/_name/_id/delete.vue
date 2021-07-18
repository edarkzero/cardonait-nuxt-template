<template>
  <div class="container mt-4">
    <h5>Do you want to completely remove "{{ user.name }}" from the registers?</h5>
    <b-button to="/" variant="primary">
      No, leave it be and return to previous page
    </b-button>
    <b-button variant="danger" @click="handleDestroy">
      Yes, I want to and I'm responsible for that
    </b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  // eslint-disable-next-line require-await
  async asyncData ({ params }) {
    const id = params.id
    return { id }
  },
  data () {
    return {
      selected: 'No'
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUserById(this.id)
    }
  },
  mounted () {
    this.fetchUser(this.id)
  },
  methods: {
    ...mapActions([
      'fetchUser',
      'destroyUser'
    ]),
    handleDestroy () {
      this.destroyUser([this.user.id])
      this.$router.go(-1)
    }
  },
  head () {
    return {
      title: 'Remove the details of ' + this.user.name + ' to open a slot on the crew',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Remove the name, mail, profile photos, and other info for ' + this.user.name + ' with this code ' + this.user.id
        }
      ]
    }
  }
}
</script>
