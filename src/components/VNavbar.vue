<template>
  <header class="header" id="header"
    v-click-outside="mobileNavClose"
    v-handle-scroll="mobileNavClose"
  >
    <router-link :to="{name: 'home'}" class="logo">
      VF
    </router-link>
    <div class="btn-hamburger" @click="mobileNavOpen = !mobileNavOpen">
        <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar" :class="{'navbar-open': mobileNavOpen}">
      <ul v-if="user">
        <!-- Show these option only on mobile-->
        <li class="navbar-item mobile-only">
          <router-link :to="{name: 'Profile'}">My Profile</router-link>
        </li>
        <li class="navbar-item">
          <a @click.prevent="$store.dispatch('auth/signOut')">Logout</a>
        </li>
        <li class="navbar-user" v-click-outside="closeMenuDropdown">
          <a @click.prevent="isActive = !isActive">
            <img class="avatar-small" :src="user.avatar" alt="">
            <span>{{user.name}}
              <img class="icon-profile" src="../assets/img/svg/arrow-profile.svg" alt="">
            </span>

          </a>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown" :class="{'active-drop': isActive}">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link :to="{name: 'Profile'}">
                  View Profile
                </router-link>
              </li>
              <li class="dropdown-menu-item">
                <a @click.prevent="$store.dispatch('auth/signOut')" >Log out</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li class="navbar-item">
          <router-link :to="{name: 'PageRegistration'}">Register</router-link>
        </li>

        <li class="navbar-item">
          <router-link :to="{name: 'PageLogin'}">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
import clickOutside from '@/directives/clickoutside'
import handleScroll from '@/directives/handle-scroll'
export default {
  computed: {
    ...mapGetters({
      user: 'auth/authorizedUser'
    })
  },
  data () {
    return {
      isActive: true,
      mobileNavOpen: false
    }
  },

  directives: {
    clickOutside,
    handleScroll
  },

  methods: {
    closeMenuDropdown () {
      this.isActive = false
    },
    mobileNavClose () {
      this.mobileNavOpen = false
    }
  }
}
</script>

<style>

</style>
