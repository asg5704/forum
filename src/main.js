// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import firebase from 'firebase'
import Vuelidate from 'vuelidate'
import AppDate from '@/components/AppDate'

Vue.use(Vuelidate)
Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

// Firebase initialization
const config = {
  apiKey: process.env.FBASE_API_KEY,
  authDomain: process.env.FBASE_AUTH_DOMAIN,
  databaseURL: process.env.FBASE_DATABASE_URL,
  projectId: process.env.FBASE_PROJECT_ID,
  storageBucket: process.env.FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FBASE_MESSAGING_ID,
  appId: process.env.FBASE_APP_ID
}

firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
