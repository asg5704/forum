<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        :to="{name: 'Forum', params: {id: forum['.key']}}" class="forum-name"
      >
        {{forum.name}}
      </router-link>

      <p class="forum-description ">{{forum.description}}</p>
    </div>


    <div class="threads-count">
      <p class="count text-lead">{{threadCount}}</p> {{threadCount === 1 ? 'thread' : 'threads'}}
    </div>

    <div class="last-thread">
      <!-- TODO -->
    </div>
  </div>
</template>

<script>
import {countObjectProps} from '@/utils'
export default {
  props: {
    forum: {
      required: true,
      type: Object
    }
  },

  computed: {
    threadCount () {
      return countObjectProps(this.forum.threads)
    }
  }
}
</script>

<style>

</style>
