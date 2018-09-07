import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Search from '@/components/Search'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: 'Vue Gyphy - A Vue.js project showing Giphy images',
      metaTags: [
        {
          name: 'description',
          content: 'A Vue.js project showing Giphy images'
        },
        {
          property: 'og:description',
          content: 'A Vue.js project showing Giphy images'
        }
      ]
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      title: 'Search - Vue Gyphy',
      metaTags: [
        {
          name: 'description',
          content: 'Search page for Giphy images'
        },
        {
          property: 'og:description',
          content: 'Search page for Giphy images'
        }
      ]
    }
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
