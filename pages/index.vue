<template>
  <div class="container">
    <div>
      <h1>
        Users - Count:{{users.total}}
      </h1>
      <b-table striped hover :items="users.rows" :fields="fields" :busy="users.length === 0">
        <template v-slot:table-busy>
          <div class="text-center text-black-50 my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(enabled)="data">
          <b class="text-info">{{ data.value === 1 ? 'Yes' : 'No' }}</b>
        </template>
        <template v-slot:cell(profile_photo_url)="data">
          <b-img :src="data.value" alt="Profile" height="40px"></b-img>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  components: {},
  data () {
    return {
      fields: ['id', {
        key: 'profile_photo_url',
        label: 'Profile'
      }, 'username', 'email', 'user_group', 'last_visit', 'enabled']
    }
  },
  computed: {
    ...mapGetters({
      users: 'getUsers'
    })
  },
  created () {
    this.fetchUsers()
  },
  methods: {
    ...mapActions([
      'fetchUsers'
    ])
  }
})
</script>

<style>

</style>
