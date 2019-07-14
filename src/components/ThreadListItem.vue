<template>
  <div class="thread" v-if="thread && user">
    <div>
        <p>
          <router-link :to="{name: 'PageThreadShow', params: {id: thread['.key']}}">{{thread.title}}</router-link>
        </p>

        <p class="text-faded text-xsmall" >
            By <a href="#">{{user.name}}</a>,
            <app-date :timeStamp="thread.publishedAt" />.
        </p>
    </div>

    <div class="activity">
        <p class="replies-count">
            {{repliesCount}} replies
        </p>

        <img class="avatar-medium" :src="user.avatar" alt="">

        <div>
            <p class="text-xsmall">
              <a href="#">{{user.name}}</a>
            </p>
            <p class="text-xsmall text-faded">2 hours ago</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thread: {
      required: true,
      type: Object
    }
  },

  computed: {
    repliesCount () {
      return this.$store.getters['threads/threadRepliesCount'](this.thread['.key'])
    },
    user () {
      return this.$store.state.users.items[this.thread.userId]
    }
  }
}
</script>

<style>

</style>
