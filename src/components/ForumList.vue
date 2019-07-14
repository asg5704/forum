<template>
  <div>
    <ForumItem
      v-for="forum in forums"
      :key="forum['.key']"
      :forum="forum"
    />
  </div>
</template>

<script>
import ForumItem from './ForumItem'
export default {
  props: {
    forums: {
      required: true,
      type: Array
    }
  },

  components: {
    ForumItem
  }
}
</script>

<style>

</style>
