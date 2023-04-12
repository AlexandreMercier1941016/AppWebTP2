import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/movies/:keyword&:genre&:year',
      name: 'searchMovies',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MovieListSearchResult.vue'),
      props: castRouteParams
    },
  ]
})

function castRouteParams(route) {
  return {
    id: Number(route.params.id)
  }
}

export default router
