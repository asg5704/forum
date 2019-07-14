<template>
  <div class="col-full">
    <CategoryItem
      v-for="category in categories"
      :key="category['.key']"
      :category="category"
    />
  </div>
</template>

<script>
import CategoryItem from './CategoryItem'
export default {
  props: {
    categories: {
      required: true,
      type: Array
    }
  },

  components: {
    CategoryItem
  }
}
</script>

<style>

</style>
