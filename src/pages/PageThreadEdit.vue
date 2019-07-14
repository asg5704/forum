<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Editing <i>{{thread.title}}</i></h1>
    <ThreadEditor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ThreadEditor from '@/components/ThreadEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },

  mixins: [asyncDataStatus],

  components: {
    ThreadEditor
  },

  methods: {
    ...mapActions('threads', ['updateThread', 'fetchThread']),
    ...mapActions('posts', ['fetchPost']),

    save ({title, text}) {
      // dispatch action
      this.updateThread({
        id: this.id,
        title,
        text
      }).then(thread => {
        this.$router.push({
          name: 'PageThreadShow',
          params: { id: this.id }
        })
      })
    },

    cancel () {
      this.$router.go(-1)
    }
  },

  computed: {
    thread () {
      return this.$store.state.threads.items[this.id]
    },

    text  () {
      const post = this.$store.state.posts.items[this.thread.firstPostId]
      return post ? post.text : null
    }
  },

  created () {
    this.fetchThread({id: this.id})
      .then(thread => { this.fetchPost({id: thread.firstPostId}) })
      .then(() => { this.asyncDataStatus_fetched() })
  }
}
</script>

<style>

</style>
