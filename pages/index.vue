<template>
  <div class="container">
    <div>
      <h1>
        Users - Count:{{ users.total }}
      </h1>
      <b-table
        striped
        hover
        :items="users.rows"
        :fields="fields"
        :busy="users.length === 0"
        stacked="sm"
      >
        <template v-slot:table-busy>
          <div class="text-center text-black-50 my-2">
            <b-spinner class="align-middle" />
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(enabled)="data">
          <b class="text-info">{{ data.value ? 'Yes' : 'No' }}</b>
        </template>
        <template v-slot:cell(activated)="data">
          <b class="text-info">{{ data.value ? 'Yes' : 'No' }}</b>
        </template>
        <template v-slot:cell(profile_photo_url)="data">
          <b-img :src="data.value" alt="Profile" height="40px" width="40px" />
        </template>
        <template #cell(actions)="row">
          <b-btn size="sm" :to="{name:'users-name-id-edit',params:{id:row.item.id,name:row.item.username}}">
            <BIconPencil>{{ row.item.id }}</BIconPencil>
          </b-btn>
          <b-btn size="sm" :to="{name:'users-name-id-delete',params:{id:row.item.id,name:row.item.username}}">
            <BIconTrash>{{ row.item.id }}</BIconTrash>
          </b-btn>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { BIconPencil, BIconTrash } from 'bootstrap-vue'

export default Vue.extend({
  components: {
    BIconPencil,
    BIconTrash
  },
  data () {
    return {
      fields: [
        'id', {
          key: 'profile_photo_url',
          label: 'Profile'
        },
        'username', 'email', 'user_group', 'last_visit', 'enabled', 'activated',
        { key: 'actions', label: 'Actions' }]
    }
  },
  computed: {
    ...mapGetters({
      users: 'getUsers'
    })
  },
  created () {
    //this.fetchUsers()
  },
  methods: {
    ...mapActions([
      'fetchUsers'
    ])
  },
  head () {
    return {
      title: 'All our experts of CardonaIT are waiting',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'All our experts of CardonaIT are waiting, rigth now we are (' + this.users.total + ')'
        }
      ]
    }
  }
})
</script>
