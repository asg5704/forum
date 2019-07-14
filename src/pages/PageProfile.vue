<template>
  <div class="flex-grid">

    <UserProfile
      v-if="!edit"
      :user="user"
    />
    <UserEdit
      v-if="edit"
      :user="user"
    />

    <div class="col-7 push-top">

      <div class="profile-header">
        <span class="text-lead">
          {{user.username}} recent activity
        </span>
        <a href="#">See only started threads?</a>
      </div>
      <hr>

      <PostList :posts="userPosts" />
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import UserProfile from '@/components/UserProfile'
import UserEdit from '@/components/UserEdit'
import {mapGetters} from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    PostList,
    UserProfile,
    UserEdit
  },

  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },

  mixins: [asyncDataStatus],

  computed: {
    ...mapGetters({
      user: 'auth/authorizedUser'
    }),

    userPosts () {
      return this.$store.getters['users/userPosts'](this.user['.key'])
    }
  },

  created () {
    this.$store.dispatch('posts/fetchPosts', {ids: this.user.posts})
      .then(() => this.asyncDataStatus_fetched())
  }
}
</script>

<style>

</style>
