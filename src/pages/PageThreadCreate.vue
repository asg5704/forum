<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Create new thread in <i>{{forum.name}}</i></h1>
    <ThreadEditor
      ref="editor"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import {mapActions} from 'vuex'
export default {
  props: {
    forumId: {
      required: true,
      type: String
    }
  },

  mixins: [asyncDataStatus],

  components: {
    ThreadEditor
  },

  data () {
    return {
      isSaved: false
    }
  },

  methods: {
    ...mapActions('threads', ['createThread']),
    ...mapActions('forums', ['fetchForum']),

    save ({title, text}) {
      // dispatch action
      this.createThread({
        forumId: this.forum['.key'],
        title,
        text
      }).then(thread => {
        this.isSaved = true
        this.$router.push({
          name: 'PageThreadShow',
          params: { id: thread['.key'] }
        })
      })
    },

    cancel () {
      this.$router.go(-1)
    }
  },

  computed: {
    forum () {
      return this.$store.state.forums.items[this.forumId]
    },

    hasUnsavedChanges () {
      return (this.$refs.editor.form.title || this.$refs.editor.form.text) && !this.isSaved
    }
  },

  created () {
    this.fetchForum({id: this.forumId})
      .then(() => { this.asyncDataStatus_fetched() })
  },

  beforeRouteLeave (to, from, next) {
    if (this.hasUnsavedChanges()) {
      const confirmed = window.confirm('You\'re changes will not be saved!')

      if (confirmed) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>

<style>

</style>
