import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authService from './services/authService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/:id',
      name: 'movie',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MovieDetails.vue'),
      props: castRouteParams
    },
    {
      path: '/movies',
      name: 'searchMovies',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MovieListSearchResult.vue'),
      props: castRouteParams2
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/account',
      name: 'account',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateAccountView.vue')
    },
    {
      path: '/add-movie',
      name: 'AddMovie',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./components/AddMovie.vue'),
      beforeEnter: async (to, from, next) => {
        const isAdmin = await authService.checkAdmin();
        if (!isAdmin) {
          return next('/login'); 
        }
        next();
      }
    },
  ]
})

function castRouteParams(route) {
  return {
    id: Number(route.params.id)
  }
}
function castRouteParams2(route) {
  return {
    genre: String(route.params.genre),
    keywords:String(route.params.keywords),
    year:String(route.params.keyword)
  }
}

export default router