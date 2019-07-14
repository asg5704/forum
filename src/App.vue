<template>
  <div id="app">
    <v-navbar />
    <div class="container">
      <router-view
        :key="$route.path"
        v-show="showPage"
        @ready="pageReady"
      />
      <VLoading v-show="!showPage"/>
    </div>
  </div>
</template>

<script>
import VNavbar from '@/components/VNavbar'
import VLoading from '@/components/VLoading'
import NProgress from 'nprogress'
export default {
  components: {
    VNavbar,
    VLoading
  },

  data () {
    return {
      showPage: false
    }
  },

  methods: {
    pageReady () {
      this.showPage = true
      NProgress.done()
    }
  },

  created () {
    NProgress.configure({
      speed: 250,
      showSpinner: false
    })
    NProgress.start()
    this.$router.beforeEach((to, from, next) => {
      // to and from are both route objects. must call `next`.
      this.showPage = false
      NProgress.start()
      next()
    })
  }
}
</script>

<style>
@import "assets/css/style.css";
@import "~nprogress/nprogress.css";

#nprogress .bar {
  background-color: hsla(158, 74%, 51%, 1) !important;
  min-height: 6px;
}

#nprogress .peg {
  box-shadow: 0 0 10px hsla(158, 74%, 51%, 1), 0 0 5px hsla(158, 74%, 51%, 1) !important;
}
</style>
