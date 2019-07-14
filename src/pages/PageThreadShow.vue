<template>
  <div v-if="asyncDataStatus_ready" class="col-large push-top">
    <h1>{{thread.title}}
      <router-link :to="{name: 'PageThreadEdit', params: {id: this.id}}" class="btn-green btn-small" tag="button">Edit Thread</router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{user.name}}</a>, <AppDate :timeStamp="thread.publishedAt"/>
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{repliesCount}} replies by {{contributorsCount}} contributors</span>
    </p>
    <PostList :posts="posts"/>
    <PostEditor
      :threadId="id"
      v-if="authUser"
    />
    <div v-else
      class="text-center"
      style="margin-bottom: 56px;"
    >
      <router-link :to="{name: 'PageLogin', query: {redirectTo: $router.path}}">Login</router-link> or
      <router-link :to="{name: 'PageRegistration', query: {redirectTo: $router.path}}">Register</router-link> to post a reply
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import {countObjectProps} from '@/utils'
import {mapActions, mapGetters} from 'vuex'
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },

  mixins: [asyncDataStatus],

  components: {
    PostList,
    PostEditor
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/authorizedUser'
    }),

    user () {
      return this.$store.state.users.items[this.thread.userId]
    },

    thread () {
      return this.$store.state.threads.items[this.id]
    },
    posts () {
      const postIds = Object.values(this.thread.posts)
      return Object.values(this.$store.state.posts.items)
        .filter(post => postIds.includes(post['.key']))
    },

    repliesCount () {
      return this.$store.getters['threads/threadRepliesCount'](this.thread['.key'])
    },

    contributorsCount () {
      // // find the replies
      // const replies = Object.keys(this.thread.posts)
      //   .filter(postId => postId !== this.thread.firstPostId)
      //   .map(postId => this.$store.state.posts[postId])
      // // get user ids
      // const userIds = replies.map(post => post.userId)
      // // count unique ids
      // return userIds.filter((item, index) => index === userIds.indexOf(item)).length
      return countObjectProps(this.thread.contributors)
    }
  },
  methods: {
    ...mapActions('threads', ['fetchThread']),
    ...mapActions('users', ['fetchUser']),
    ...mapActions('posts', ['fetchPosts'])
  },
  created () {
    this.fetchThread({id: this.id})
      .then(thread => {
        // After getting thread fetch the user
        this.fetchUser({id: thread.userId})
        return this.fetchPosts({ids: Object.keys(thread.posts)})
      })
      .then(posts => {
        Promise.all(posts.map(post => { this.fetchUser({id: post.userId}) }))
      })
      .then(() => { this.asyncDataStatus_fetched() })
  }
}
</script>

<style>

</style>
