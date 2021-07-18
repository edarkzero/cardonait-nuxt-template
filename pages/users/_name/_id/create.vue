<template>
  <div class="container">
    <h1 class="my-2">
      Create an user
    </h1>
    <UserForm :user="user" @onSubmit="onSubmit" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserForm from '@/components/users/form'

export default {
  components: { UserForm },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    ...mapActions([
      'persistUser'
    ]),
    onSubmit (form) {
      this.persistUser(form)
    }
  },
  head () {
    return {
      title: 'Create the details for an user to become a partner',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Create the name, mail, profile photos, and much more for and user'
        }
      ]
    }
  }
}
</script>
