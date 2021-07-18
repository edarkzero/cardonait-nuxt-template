<template>
  <div class="container">
    <h1 class="my-2">
      Edit #{{ user.name }}
    </h1>
    <UserForm :user="user" @onSubmit="onSubmit" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserForm from '@/components/users/form'

export default {
  components: { UserForm },
  // eslint-disable-next-line require-await
  async asyncData ({ params }) {
    const id = params.id
    return { id }
  },
  computed: {
    user () {
      return this.$store.getters.getUserById(this.id)
    }
  },
  mounted () {
    if (typeof this.user.id === 'undefined') {
      this.fetchUser(this.id)
    }
  },
  methods: {
    ...mapActions([
      'modifyUser',
      'fetchUser'
    ]),
    onSubmit (form) {
      this.modifyUser({ id: this.id, data: form })
    }
  },
  head () {
    return {
      title: 'Update the details for ' + this.user.name + ' to become a partner',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Update the name, mail, profile photos, and much more for ' + this.user.name + ' with this code ' + this.user.id
        }
      ]
    }
  }
}
</script>
