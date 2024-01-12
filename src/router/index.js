import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView
    },
    {
      path: '/home', 
      name: 'home', 
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/addpost', 
      name: 'addpost', 
      component: () => import('../views/AddPostView.vue'),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/seeallposts', 
      name: 'seeallposts', 
      component: () => import('../views/SeeAllPostsView.vue'),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/registration', 
      name: 'registration', 
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/about', 
      name: 'about', 
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/news', 
      name: 'news', 
      component: () => import('../views/NewsView.vue'),
    }
  ]
})

export default router
