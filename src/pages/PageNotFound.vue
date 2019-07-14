<template>
  <div class="col-full">
    <h1 class="notfoundHeading" :class="$style.notfoundHeading">Not Found</h1>
    <p class="notfoundContent" :class="$style.notfoundContent">Oops, we couldn't find what you were looking for. Why don't you <router-link :to="{name: 'home'}">go home instead?</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',

  created () {
    this.$emit('ready')
  }
}
</script>

<style module>
  .notfoundHeading {
    font-size: 100px;
  }
  .notfoundContent {
    font-size: 50px;
    font-weight: 100;
  }
</style>
