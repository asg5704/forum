<template>
  <div class="post-list">
    <PostItem
      :post="post"
      v-for="post in posts"
      :key="post['.key']"
    />
  </div>
</template>

<script>
// import sourceData from '../data'
import PostItem from '@/components/PostItem'
export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      required: true,
      type: Array
    }
  }
}
</script>

<style>

</style>
