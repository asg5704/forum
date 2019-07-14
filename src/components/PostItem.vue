<template>
  <div v-if="post && user" class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{user.name}}</a>

      <a href="#">
        <img class="avatar-large" :src="user.avatar" alt="">
      </a>

      <p class="desktop-only text-small">{{userThreadCount}} threads</p>
      <p class="desktop-only text-small">{{userPostCount}} posts</p>


      <span class="online desktop-only">online</span>
    </div>

    <div class="post-content">
      <template v-if="!editing">
        <div class="max">
          <p>{{post.text}}</p>
        </div>
        <a @click.prevent="editing = true" href="#" style="margin-left: auto;" class="link-unstyled" title="Make a change"><i class="fa fa-pencil"></i>Edit</a>
      </template>
      <div v-else>
        <PostEditor
          :post="post"
          @save="editing = false"
          @cancel="editing = false"
        />
      </div>
    </div>
    <div class="post-date text-faded">
      <div v-if="post.edited" class="edition-info">edited</div>
      <app-date :timeStamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
import PostEditor from './PostEditor'
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },

  components: {
    PostEditor
  },

  data () {
    return {
      editing: false
    }
  },

  computed: {
    user () {
      return this.$store.state.users.items[this.post.userId]
    },
    userPostCount () {
      return this.$store.getters['users/userPostsCount'](this.post.userId)
    },
    userThreadCount () {
      return this.$store.getters['users/userThreadsCount'](this.post.userId)
    }
  }

}
</script>

<style>
  .max {
    max-width: 680px;
  }
</style>
