import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/PageHome'
import PageThreadShow from '@/pages/PageThreadShow'
import PageThreadCreate from '@/pages/PageThreadCreate'
import PageThreadEdit from '@/pages/PageThreadEdit'
import PageNotFound from '@/pages/PageNotFound'
import Forum from '@/pages/PageForum'
import Category from '@/pages/PageCategory'
import Profile from '@/pages/PageProfile'
import Registration from '@/pages/PageRegistration'
import Login from '@/pages/PageLogin'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      props: true
    },
    {
      path: '/thread/new/:forumId',
      name: 'PageThreadCreate',
      component: PageThreadCreate,
      props: true,
      meta: { authRequired: true }
    },
    {
      path: '/thread/:id',
      name: 'PageThreadShow',
      component: PageThreadShow,
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'PageThreadEdit',
      component: PageThreadEdit,
      props: true,
      meta: { authRequired: true }
    },
    {
      path: '/register',
      name: 'PageRegistration',
      component: Registration,
      meta: { guestRequired: true }
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: Login,
      meta: { guestRequired: true }
    },
    {
      path: '/logout',
      name: 'Logout',
      meta: { authRequired: true },
      beforeEnter (to, from, next) {
        store.dispatch('signOut')
          .then(() => next({name: 'home'}))
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true,
      meta: { authRequired: true }
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: Profile,
      props: {edit: true},
      meta: { authRequired: true }
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(`Navigation to ${to.name} from ${from.name}`)

  store.dispatch('auth/initAuthentication')
    .then(user => {
      if (to.matched.some(route => route.meta.authRequired)) {
        // protected route

        if (user) {
          next()
        } else {
          next({name: 'PageLogin', query: {redirectTo: to.path}})
        }
      } else if (to.matched.some(route => route.meta.guestRequired)) {
        if (!user) {
          next()
        } else {
          next({name: 'home'})
        }
      } else {
        next()
      }
    })
})

export default router
