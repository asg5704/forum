<template>
  <div class="flex-grid justify-center">
    <div class="col-2">

      <form @submit.prevent="register" class="card card-form">
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            v-model="form.name"
            @blur="$v.form.name.$touch()"
            id="name" type="text" class="form-input"
          />
          <template v-if="$v.form.name.$error">
            <span v-if="!$v.form.name.required" class="form-error">This field is required</span>
          </template>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model.lazy="form.username"
            @blur="$v.form.username.$touch()"
            id="username" type="text" class="form-input"
          />
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.username.unique" class="form-error">Sorry, this username is already taken!</span>
          </template>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model.lazy="form.email"
            @blur="$v.form.email.$touch()"
            id="email" type="email" class="form-input"
          />
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.email.unique" class="form-error">Sorry, but that e-mail was previously used!</span>
          </template>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model.lazy="form.password"
            @blur="$v.form.password.$touch()"
            id="password" type="password" class="form-input"
          />
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.password.minLength" class="form-error">Your password must be six characters or longer</span>
          </template>
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input
            v-model.lazy="form.avatar"
            @blur="$v.form.avatar.$touch()"
            id="avatar" type="text" class="form-input"
          />
          <template v-if="$v.form.avatar.$error">
            <span v-if="!$v.form.avatar.url" class="form-error">The URL supplied is invalid</span>
            <span v-else-if="!$v.form.avatar.supportedImages" class="form-error">This file type is not supported</span>
            <span v-else-if="!$v.form.avatar.responseIsValid" class="form-error">This image cannot be found</span>
          </template>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Register</button>
        </div>

      </form>
      <div class="text-center push-top">
        <button class="btn-red btn-xsmall" @click="registerWithGoogle"><i class="fa fa-google fa-btn"></i>Sign up with Google</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, url } from 'vuelidate/lib/validators'
import { uniqueUsername, uniqueEmail, supportedImages, responseIsValid } from '@/utils/validators'
export default {
  data () {
    return {
      form: {
        name: null,
        email: null,
        username: null,
        password: null,
        avatar: null
      }
    }
  },

  validations: {
    form: {
      name: {
        required
      },
      email: {
        required,
        email,
        unique: uniqueEmail
      },
      username: {
        required,
        unique: uniqueUsername
      },
      password: {
        required,
        minLength: minLength(6)
      },
      avatar: {
        url,
        supportedImages,
        responseIsValid
      }
    }
  },

  methods: {
    register () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return
      }
      this.$store.dispatch('auth/registerUserWithEmailAndPassword', this.form)
        .then(() => this.$router.push('/'))
    },

    registerWithGoogle () {
      this.$store.dispatch('auth/signInWithGoogle')
        .then(() => this.$router.push('/'))
    }
  },
  created () {
    this.$emit('ready')
  }
}
</script>

<style>

</style>
