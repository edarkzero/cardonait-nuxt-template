<template>
  <div class="container">
    <h1 class="my-2">
      Edit #{{ this.id }}
    </h1>
    <b-form v-if="show" enctype="multipart/form-data" method="put" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        />
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        />
      </b-form-group>

      <b-form-group id="input-group-3" label="Group:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.user_group"
          :options="groups"
          required
        />
      </b-form-group>

      <b-form-group id="input-group-4" label="Your Username:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.username"
          required
          placeholder="Enter username"
        />
      </b-form-group>

      <b-form-group id="input-group-5">
        <b-form-checkbox
          id="checkbox-1"
          v-model="form.enabled"
          :value="true"
          :unchecked-value="false"
        >
          Set as {{ form.enabled ? 'enabled' : 'disabled' }}
        </b-form-checkbox>
      </b-form-group>

      <b-form-group id="input-group-6">
        <b-form-checkbox
          id="checkbox-2"
          v-model="form.activated"
          :value="true"
          :unchecked-value="false"
        >
          Set as {{ form.activated ? 'activated' : 'inactive' }}
        </b-form-checkbox>
      </b-form-group>

      <b-form-file
        v-model="form.profile_photo"
        accept="image/jpeg, image/png"
        :state="Boolean(form.profile_photo)"
        placeholder="Choose a profile file or drop it here..."
        drop-placeholder="Drop file here..."
      >
        <template slot="file-name" slot-scope="{ names }">
          <b-badge variant="dark">
            {{ names[0] }}
          </b-badge>
        </template>
      </b-form-file>
      <div class="mt-3">
        Selected file: {{ form.profile_photo ? form.profile_photo.name : '' }}
      </div>

      <b-button type="submit" variant="primary">
        Submit
      </b-button>
      <b-button type="reset" variant="danger">
        Reset
      </b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
    <b-card class="mt-3" header="Form Submit Observable Data">
      <pre class="m-0">{{ user }}</pre>
    </b-card>
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
      form: {
        email: '',
        name: '',
        username: '',
        user_group: null,
        profile_photo: null,
        activated: false,
        enabled: false
      },
      groups: [
        { text: 'Select One', value: null },
        { text: 'Registered', value: 'registered' },
        { text: 'Admin', value: 'admin' }
      ],
      show: true
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUserById(this.id)
    }
  },
  watch: {
    user (newUser) {
      this.updateFields(newUser)
    }
  },
  mounted () {
    if (typeof this.user.id !== 'undefined') {
      this.updateFields(this.user)
    } else {
      this.fetchUser(this.id)
    }
  },
  methods: {
    ...mapActions([
      'modifyUser',
      'fetchUser'
    ]),
    updateFields (user) {
      this.form.email = user.email
      this.form.name = user.name
      this.form.username = user.username
      this.form.user_group = user.user_group
      this.form.profile_photo = user.profile_photo
      this.form.activated = user.activated
      this.form.enabled = user.enabled
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.modifyUser({ id: this.id, data: this.form })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.username = ''
      this.form.user_group = null
      this.form.profile_photo = null
      this.form.activated = false
      this.form.enabled = false
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
