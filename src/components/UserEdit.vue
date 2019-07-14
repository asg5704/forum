<template>
  <div class="col-3 push-top">
    <div class="profile-card">

      <p class="text-center">
        <img :src="user.avatar" alt="" class="avatar-xlarge img-update">
      </p>

      <div class="form-group">
        <input
          v-model.lazy="activeUser.username" type="text" placeholder="Username" class="form-input text-lead text-bold"
          @blur="$v.activeUser.username.$touch()"
        />
        <template v-if="$v.activeUser.username.$error">
          <span v-if="!$v.activeUser.username.required" class="form-error">This field is required</span>
          <span v-if="!$v.activeUser.username.unique" class="form-error">Sorry, this username is already taken!</span>
        </template>
      </div>

      <div class="form-group">
        <input
          v-model.lazy="activeUser.name" type="text" placeholder="Full Name" class="form-input text-lead"
          @blur="$v.activeUser.name.$touch()"
        />
        <template v-if="$v.activeUser.name.$error">
          <span v-if="!$v.activeUser.name.required" class="form-error">This field is required</span>
        </template>
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          v-model="activeUser.bio" class="form-input" id="user_bio" placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="stats">
        <span>{{userPostsCount}} posts</span>
        <span>{{userThreadsCount}} threads</span>
      </div>

      <hr>

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          v-model.lazy="activeUser.website" autocomplete="off" class="form-input" id="user_website"
          @blur="$v.activeUser.website.$touch()"
        />
        <template v-if="$v.activeUser.website.$error">
          <span v-if="!$v.activeUser.website.url" class="form-error">This must be a valid URL</span>
        </template>
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          v-model.lazy="activeUser.email" autocomplete="off" class="form-input" id="user_email"
          @blur="$v.activeUser.email.$touch()"
        />
        <template v-if="$v.activeUser.email.$error">
          <span v-if="!$v.activeUser.email.required" class="form-error">This field is required</span>
          <span v-if="!$v.activeUser.email.unique" class="form-error">Sorry, this email is already taken!</span>
        </template>
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          v-model="activeUser.location" autocomplete="off" class="form-input" id="user_location"
        />
      </div>

    <div class="btn-group space-between">
      <button class="btn-ghost"
        @click.prevent="cancel"
      >Cancel</button>
      <button type="submit" class="btn-blue"
        @click.prevent="save"
      >Save</button>
    </div>
  </div>

  <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>
</div>
</template>

<script>
import {email, required, url} from 'vuelidate/lib/validators'
import {uniqueEmail, uniqueUsername} from '@/utils/validators'
export default {
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  validations: {
    activeUser: {
      name: {
        required
      },
      username: {
        required,
        unique: uniqueUsername
      },
      email: {
        required,
        email,
        unique: uniqueEmail
      },
      website: {
        url
      }
    }
  },

  data () {
    return {
      // We want to clone so we don't update state
      activeUser: {...this.user}
    }
  },

  computed: {
    userThreadsCount () {
      return this.$store.getters['users/userThreadsCount'](this.user['.key'])
    },
    userPostsCount () {
      return this.$store.getters['users/userPostsCount'](this.user['.key'])
    }
  },

  methods: {
    save () {
      this.$v.activeUser.$touch()
      if (this.$v.activeUser.$invalid) {
        return
      }
      // This implies we will need one action & 1 mutation to update state
      // Clone activeUser so that 2-way binding does not persist
      this.$store.dispatch('users/updateUser', {...this.activeUser})
      this.$router.push({name: 'Profile'})
    },
    cancel () {
      this.$router.push({name: 'Profile'})
    }
  }
}
</script>

<style>

</style>
